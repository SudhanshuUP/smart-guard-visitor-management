import React, { useState, useEffect } from "react";

export default function GuardTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  return (
    <div className="task-page">
      {/* ===== HEADER ===== */}
      <header className="header">
        <div className="header-left">
          <div className="logo">🛡</div>
          <h1>SurakshaSetu</h1>
        </div>

        <div className="header-right">
          <nav className="nav-links">
            <a href="/guard-dashboard">Home</a>
            <a href="/guard-tasks" className="active">
              Tasks
            </a>
            <a href="/rules">Rules</a>
            <a href="/news">News</a>
            <a href="/contact">Contact</a>
          </nav>
        </div>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main className="task-container">
        <h2>🧾 Assigned Tasks</h2>
        {tasks.length === 0 ? (
          <p className="empty-text">No tasks assigned yet.</p>
        ) : (
          <div className="task-scroll">
            {tasks.map((t, i) => (
              <div className="task-card" key={i}>
                <h4>{t.task_title}</h4>
                <div className="task-details">
                  <p>
                    <b>Deadline:</b> {t.deadline}
                  </p>
                  <p>
                    <b>Priority:</b> {t.priority}
                  </p>
                  <p>
                    <b>Location:</b> {t.location}
                  </p>
                </div>
                <p className="task-desc">{t.description}</p>
              </div>
            ))}
          </div>
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

        .task-page {
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
        .task-container {
          flex: 1;
          width: 95%;
          margin: 70px auto;
          background: white;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }

        .task-scroll {
          display: flex;
          overflow-x: auto;
          gap: 25px;
          padding-bottom: 10px;
          scrollbar-width: thin;
        }

        .task-scroll::-webkit-scrollbar {
          height: 10px;
        }

        .task-scroll::-webkit-scrollbar-thumb {
          background: #ccc;
          border-radius: 10px;
        }

        .task-card {
          min-width: 380px;
          flex: 0 0 auto;
          background: #f9fafc;
          border-radius: 16px;
          padding: 24px;
          border: 1px solid #ddd;
          transition: all 0.3s ease;
          box-shadow: 0 6px 12px rgba(0,0,0,0.1);
        }

        .task-card:hover {
          border-color: #fca311;
          transform: translateY(-4px);
        }

        .task-details {
          margin: 10px 0;
          color: #444;
          font-size: 0.95rem;
        }

        .task-desc {
          color: #333;
          font-size: 1rem;
        }

        .empty-text {
          text-align: center;
          color: #777;
          font-style: italic;
          font-size: 1.1rem;
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
          .task-scroll {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
