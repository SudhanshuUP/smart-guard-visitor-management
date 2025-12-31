import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function GuardDashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const { data } = await supabase.auth.getUser();
    if (data?.user) {
      setUser(data.user);
    } else {
      alert("Please log in first.");
      window.location.href = "/login";
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  return (
    <>
      <div className="guard-dashboard">
        {/* ===== HEADER ===== */}
        <header className="header">
          <div className="header-left">
            <div className="logo">👮‍♂️</div>
            <h1>SurakshaSetu</h1>
          </div>

          <div className="header-right">
            <nav className="nav-links">
              <a href="/guard">Home</a>
              <a href="/rules">Rules</a>
              <a href="/news">News</a>
              <a href="/contact">Contact</a>
            </nav>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </header>

        {/* ===== BODY ===== */}
        <main className="dashboard-main">
          <div className="dashboard-content">
            <div className="welcome">
              <h2>
                Welcome, <span>{user?.email?.split("@")[0] || "Guard"}</span> 👋
              </h2>
              <p>
                Access your daily training, assigned duties, and important updates below.
              </p>
            </div>

            <div className="guard-sections">
              {[
                {
                  title: "🧠 Training Quiz",
                  desc: "Test your knowledge with training quizzes.",
                  link: "/quiz",
                  btn: "Start Quiz",
                },
                {
                  title: "🧾 Assigned Tasks",
                  desc: "View your assigned duties and responsibilities.",
                  link: "/guard-tasks",
                  btn: "View Tasks",
                },
                {
                  title: "📅 Duty Schedule",
                  desc: "Check your upcoming duty timings and shifts.",
                  link: "/guard-schedule",
                  btn: "View Schedule",
                },
                {
                  title: "📢 Announcements",
                  desc: "Stay updated with latest alerts and notices.",
                  link: "/announcements",
                  btn: "View Announcements",
                },
                {
                  title: "🎥 Training Videos",
                  desc: "Watch essential training and awareness videos.",
                  link: "/videos",
                  btn: "Watch Videos",
                },
                {
                  title: "🚨 Incident Report",
                  desc: "Report unusual or emergency incidents here.",
                  link: "/guard-incident",
                  btn: "Report Incident",
                },
              ].map((section, i) => (
                <div className="guard-card" key={i}>
                  <h3>{section.title}</h3>
                  <p>{section.desc}</p>
                  <a
                    href={section.link}
                    className="open-btn"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {section.btn}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* ===== FOOTER ===== */}
        <footer className="footer">
          <div className="footer-inner">
            <div className="footer-left">
              <div className="logo">👮‍♂️</div>
              <h2>SurakshaSetu</h2>
            </div>

            <nav className="footer-links">
              <a href="/guard-dashboard">Home</a>
              <a href="/rules">Rules</a>
              <a href="/news">News</a>
              <a href="/contact">Contact</a>
            </nav>

            <p className="footer-right">
              © {new Date().getFullYear()} SurakshaSetu — Serve. Protect. Secure.
            </p>
          </div>
        </footer>
      </div>

      {/* ===== CSS ===== */}
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

        .guard-dashboard {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background: linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%);
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

        /* ===== BODY ===== */
        .dashboard-main {
          flex: 1;
          padding: 80px 60px;
          display: flex;
          justify-content: center;
        }

        .dashboard-content {
          width: 100%;
          max-width: 1300px;
          text-align: center;
        }

        .welcome h2 {
          font-size: 2.4rem;
          font-weight: 700;
          color: #111;
          margin-bottom: 10px;
        }

        .welcome span {
          color: #fca311;
        }

        .welcome p {
          color: #444;
          font-size: 1.1rem;
          margin-bottom: 60px;
        }

        /* ===== GRID ===== */
        .guard-sections {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 35px;
        }

        .guard-card {
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 16px;
          padding: 30px 25px;
          text-align: center;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
        }

        .guard-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 35px rgba(0, 0, 0, 0.12);
        }

        .guard-card h3 {
          color: #111;
          font-size: 1.3rem;
          margin-bottom: 8px;
        }

        .guard-card p {
          color: #555;
          font-size: 0.95rem;
          margin-bottom: 18px;
          line-height: 1.5;
        }

        .open-btn {
          background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
          color: white;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 600;
          display: inline-block;
          transition: all 0.3s ease;
        }

        .open-btn:hover {
          background: #000;
          transform: translateY(-3px);
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
          .header,
          .footer-inner {
            flex-direction: column;
            gap: 10px;
            text-align: center;
          }

          .nav-links,
          .footer-links {
            flex-wrap: wrap;
            justify-content: center;
          }

          .dashboard-main {
            padding: 40px 20px;
          }
        }
      `}</style>
    </>
  );
}
