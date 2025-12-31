import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

export default function AdminQuizBuilder() {
  const [title, setTitle] = useState("");
  const [qText, setQText] = useState("");
  const [opts, setOpts] = useState(["", "", "", ""]);
  const [correct, setCorrect] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const { data } = await supabase.auth.getUser();
    if (data?.user) setUser(data.user);
    else {
      alert("Please login as Admin first.");
      window.location.href = "/login";
    }
  }

  function addQuestionLocal() {
    if (!qText.trim()) return alert("Question text required");
    if (opts.some((o) => !o.trim())) return alert("All 4 options required");
    setQuestions([
      ...questions,
      { question_text: qText.trim(), options: opts.map((o) => o.trim()), correct },
    ]);
    setQText("");
    setOpts(["", "", "", ""]);
    setCorrect(1);
  }

  async function publishQuiz() {
    if (!title.trim()) return alert("Quiz title required");
    if (questions.length === 0) return alert("Add at least one question");
    const user = (await supabase.auth.getUser()).data.user;

    const { data: quizRow, error: qErr } = await supabase
      .from("quizzes")
      .insert([{ title: title.trim(), created_by: user?.id || null }])
      .select()
      .single();
    if (qErr) return alert("Quiz create error: " + qErr.message);

    const quizId = quizRow.id;
    const qInserts = questions.map((qq) => ({
      quiz_id: quizId,
      question_text: qq.question_text,
      options: JSON.stringify(qq.options),
      correct: qq.correct,
    }));
    const { error: qqErr } = await supabase
      .from("quiz_questions")
      .insert(qInserts);
    if (qqErr) return alert("Questions insert error: " + qqErr.message);

    alert("Quiz published!");
    setTitle("");
    setQuestions([]);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  return (
    <>
      <div className="quiz-builder">
        {/* ===== HEADER ===== */}
        <header className="header">
          <div className="header-left">
            <div className="logo">🛡️</div>
            <h1>SurakshaSetu</h1>
          </div>

          <div className="header-right">
            <nav className="nav-links">
              <a href="/admin">Home</a>
              <a href="/rules">Rules</a>
              <a href="/news">News</a>
              <a href="/contact">Contact</a>
            </nav>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </header>

        {/* ===== QUIZ BUILDER CONTENT ===== */}
        <main className="main-content">
          <div className="quiz-card">
            <h2>🧠 Create Training Quiz</h2>
            <p style={{ color: "#666", marginBottom: "20px" }}>
              Add multiple-choice questions and publish quizzes for your guards.
            </p>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter quiz title"
              className="input-field"
            />

            <hr className="divider" />

            <h4>Add Question</h4>
            <textarea
              value={qText}
              onChange={(e) => setQText(e.target.value)}
              rows={3}
              placeholder="Question text"
              className="textarea"
            />

            {opts.map((o, i) => (
              <input
                key={i}
                value={o}
                onChange={(e) =>
                  setOpts((prev) => {
                    const cp = [...prev];
                    cp[i] = e.target.value;
                    return cp;
                  })
                }
                placeholder={`Option ${i + 1}`}
                className="input-field"
              />
            ))}

            <div className="select-area">
              <label>Correct option: </label>
              <select
                value={correct}
                onChange={(e) => setCorrect(parseInt(e.target.value, 10))}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
              </select>
              <button onClick={addQuestionLocal} className="add-btn">
                ➕ Add Question
              </button>
            </div>

            <h4 style={{ marginTop: 25 }}>
              Current Questions ({questions.length})
            </h4>
            <ol className="question-list">
              {questions.map((qq, idx) => (
                <li key={idx} className="question-item">
                  <div className="q-text">{qq.question_text}</div>
                  <div className="options">
                    {qq.options.map((o, i) => (
                      <div key={i}>
                        {i + 1}. {o} {qq.correct === i + 1 ? "✔️" : ""}
                      </div>
                    ))}
                  </div>
                </li>
              ))}
            </ol>

            <button onClick={publishQuiz} className="publish-btn">
              🚀 Publish Quiz
            </button>
          </div>
        </main>

        {/* ===== FOOTER ===== */}
        <footer className="footer">
          <div className="footer-inner">
            <div className="footer-left">
              <div className="logo">🛡️</div>
              <h2>SurakshaSetu</h2>
            </div>

            <nav className="footer-links">
              <a href="/admin-dashboard">Home</a>
              <a href="/rules">Rules</a>
              <a href="/news">News</a>
              <a href="/contact">Contact</a>
            </nav>

            <p className="footer-right">
              © {new Date().getFullYear()} SurakshaSetu — Secure. Smart. Safe.
            </p>
          </div>
        </footer>
      </div>

      {/* ===== STYLES ===== */}
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: "Poppins", sans-serif;
        }

        body {
          background: #f5f6fa;
        }

        .quiz-builder {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        /* ===== HEADER ===== */
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(90deg, #0f2027, #203a43, #2c5364);
          color: white;
          padding: 18px 50px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          flex-wrap: wrap;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .logo {
          font-size: 1.8rem;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 25px;
        }

        .nav-links {
          display: flex;
          gap: 25px;
        }

        .nav-links a {
          color: #fff;
          text-decoration: none;
          font-weight: 500;
          position: relative;
          transition: 0.3s;
        }

        .nav-links a::after {
          content: "";
          position: absolute;
          width: 0%;
          height: 2px;
          background: #fca311;
          left: 0;
          bottom: -5px;
          transition: width 0.3s ease;
        }

        .nav-links a:hover::after {
          width: 100%;
        }

        .logout-btn {
          background: #fca311;
          color: #111;
          font-weight: 600;
          border: none;
          padding: 10px 22px;
          border-radius: 8px;
          cursor: pointer;
          transition: 0.3s;
        }

        .logout-btn:hover {
          background: #e63946;
          color: white;
        }

        /* ===== MAIN ===== */
        .main-content {
          flex: 1;
          padding: 60px 20px;
          display: flex;
          justify-content: center;
        }

        .quiz-card {
          background: #fff;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          max-width: 700px;
          width: 100%;
          text-align: left;
        }

        .input-field, .textarea {
          width: 100%;
          padding: 10px;
          margin-top: 8px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 1rem;
          transition: border 0.3s;
        }

        .input-field:focus, .textarea:focus {
          border-color: #203a43;
          outline: none;
        }

        .divider {
          margin: 20px 0;
          border: none;
          border-top: 2px solid #eee;
        }

        .select-area {
          margin-top: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .add-btn {
          background: #203a43;
          color: white;
          border: none;
          padding: 8px 14px;
          border-radius: 8px;
          cursor: pointer;
          transition: 0.3s;
        }

        .add-btn:hover {
          background: #000;
        }

        .question-list {
          margin-top: 10px;
        }

        .question-item {
          background: #f8f9fa;
          padding: 10px 15px;
          border-radius: 8px;
          margin-bottom: 10px;
        }

        .q-text {
          font-weight: 600;
          color: #111;
          margin-bottom: 5px;
        }

        .options {
          font-size: 0.95rem;
          color: #333;
        }

        .publish-btn {
          background: #fca311;
          color: #111;
          border: none;
          font-weight: 600;
          padding: 10px 22px;
          border-radius: 8px;
          margin-top: 20px;
          cursor: pointer;
          transition: 0.3s;
        }

        .publish-btn:hover {
          background: #e63946;
          color: white;
        }

        /* ===== FOOTER ===== */
        .footer {
          background: linear-gradient(90deg, #0f2027, #203a43, #2c5364);
          color: white;
          padding: 20px 60px;
          box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.2);
        }

        .footer-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }

        .footer-links {
          display: flex;
          gap: 25px;
        }

        .footer-links a {
          color: #fff;
          text-decoration: none;
          font-weight: 500;
          position: relative;
          transition: 0.3s;
        }

        .footer-links a::after {
          content: "";
          position: absolute;
          width: 0%;
          height: 2px;
          background: #fca311;
          left: 0;
          bottom: -5px;
          transition: width 0.3s ease;
        }

        .footer-links a:hover::after {
          width: 100%;
        }

        .footer-right {
          color: #ccc;
          font-size: 0.9rem;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 768px) {
          .header, .footer-inner {
            flex-direction: column;
            gap: 10px;
            text-align: center;
          }
          .nav-links, .footer-links {
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      `}</style>
    </>
  );
}
