// src/GuardQuiz.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function GuardQuiz() {
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  useEffect(() => {
    loadLatestQuiz();
  }, []);

  useEffect(() => {
    if (!quiz) return;
    const ttl = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(ttl);
          handleSubmit();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(ttl);
  }, [quiz]);

  async function loadLatestQuiz() {
    setLoading(true);
    const { data: latest } = await supabase
      .from("quizzes")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();
    if (!latest) {
      setLoading(false);
      return;
    }
    setQuiz(latest);
    const { data: qs } = await supabase
      .from("quiz_questions")
      .select("*")
      .eq("quiz_id", latest.id)
      .order("id", { ascending: true });
    const parsed = (qs || []).map((q) => ({
      ...q,
      options:
        typeof q.options === "string" ? JSON.parse(q.options) : q.options,
    }));
    setQuestions(parsed);
    setLoading(false);
    setTimeLeft(parsed.length * 60);
  }

  function chooseOption(qid, optIndex) {
    setAnswers((prev) => ({ ...prev, [qid]: optIndex }));
  }

  async function handleSubmit() {
    if (submitted) return;
    let s = 0;
    questions.forEach((q) => {
      const picked = answers[q.id];
      if (picked && picked === q.correct) s++;
    });
    setScore(s);
    setSubmitted(true);

    const user = (await supabase.auth.getUser()).data.user;
    await supabase.from("quiz_results").insert([
      {
        user_id: user?.id || null,
        quiz_id: quiz.id,
        score: s,
        total: questions.length,
      },
    ]);
  }

  if (loading) return <div className="center card">Loading...</div>;
  if (!quiz) return <div className="center card">No quizzes available.</div>;

  const q = questions[index];

  return (
    <div className="quiz-page">
      {/* ===== HEADER ===== */}
      <header className="header">
        <div className="header-left">
          <div className="logo">🛡</div>
          <h1>SurakshaSetu</h1>
        </div>

        <div className="header-right">
          <nav className="nav-links">
            <a href="/guard-dashboard">Home</a>
            <a href="/rules">Rules</a>
            <a href="/news">News</a>
            <a href="/contact">Contact</a>
          </nav>
        </div>
      </header>

      {/* ===== MAIN QUIZ CONTENT ===== */}
      <main className="quiz-container">
        {submitted ? (
          <div className="result-card">
            <h2>Quiz Submitted</h2>
            <p>
              Your Score: <strong>{score}</strong> / {questions.length}
            </p>
          </div>
        ) : (
          <>
            <div className="quiz-header">
              <h2>{quiz.title}</h2>
              <p className="timer">
                Time Left: {Math.floor(timeLeft / 60)}:
                {String(timeLeft % 60).padStart(2, "0")}
              </p>
            </div>

            {q ? (
              <div className="question-card">
                <h3>
                  {index + 1}. {q.question_text}
                </h3>
                <div className="options">
                  {q.options.map((opt, i) => (
                    <label key={i} className="option">
                      <input
                        type="radio"
                        name={`q-${q.id}`}
                        checked={answers[q.id] === i + 1}
                        onChange={() => chooseOption(q.id, i + 1)}
                      />
                      {opt}
                    </label>
                  ))}
                </div>

                <div className="buttons">
                  <button
                    onClick={() => setIndex((i) => Math.max(0, i - 1))}
                    disabled={index === 0}
                  >
                    Previous
                  </button>
                  <button
                    onClick={() =>
                      setIndex((i) => Math.min(questions.length - 1, i + 1))
                    }
                  >
                    Next
                  </button>
                  <button onClick={handleSubmit}>Submit</button>
                </div>
              </div>
            ) : (
              <p>No question found.</p>
            )}
          </>
        )}
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-left">
            <div className="logo">🛡</div>
            <h2>SurakshaSetu</h2>
          </div>
          <nav className="footer-links">
            <a href="/guard-dashboard">Home</a>
            <a href="/rules">Rules</a>
            <a href="/news">News</a>
            <a href="/contact">Contact</a>
          </nav>
          <p className="footer-right">
            © {new Date().getFullYear()} SurakshaSetu — Security for All.
          </p>
        </div>
      </footer>

      {/* ===== STYLES ===== */}
      <style>{`
        * {
          margin: 0; padding: 0; box-sizing: border-box;
          font-family: "Poppins", sans-serif;
        }

        body {
          background: #f5f6fa;
        }

        .quiz-page {
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
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
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

        .nav-links {
          display: flex;
          gap: 25px;
        }

        .nav-links a {
          color: white;
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

        /* ===== MAIN ===== */
        .quiz-container {
          flex: 1;
          max-width: 800px;
          margin: 60px auto;
          background: white;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }

        .quiz-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .timer {
          background: #fca311;
          color: white;
          padding: 5px 12px;
          border-radius: 8px;
          font-weight: 600;
        }

        .question-card {
          margin-top: 10px;
        }

        .options {
          margin-top: 15px;
        }

        .option {
          display: block;
          margin-bottom: 10px;
          font-size: 1rem;
          cursor: pointer;
        }

        .buttons {
          margin-top: 25px;
          display: flex;
          gap: 12px;
          justify-content: center;
        }

        button {
          padding: 10px 18px;
          background: #203a43;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: 0.3s;
        }

        button:hover {
          background: #fca311;
          color: #203a43;
        }

        .result-card {
          text-align: center;
          padding: 40px;
          border-radius: 12px;
          background: #ffffff;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        /* ===== FOOTER ===== */
        .footer {
          background: linear-gradient(90deg, #0f2027, #203a43, #2c5364);
          color: white;
          padding: 20px 60px;
          box-shadow: 0 -4px 10px rgba(0,0,0,0.2);
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
          color: white;
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

        @media (max-width: 768px) {
          .header, .footer-inner {
            flex-direction: column;
            text-align: center;
            gap: 10px;
          }
        }
      `}</style>
    </div>
  );
}
