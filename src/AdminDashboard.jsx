import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function AdminDashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const { data } = await supabase.auth.getUser();
    if (data?.user) {
      setUser(data.user);
    } else {
      alert("Please login as Admin first.");
      window.location.href = "/login";
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  return (
    <>
      <div className="admin-dashboard">
        {/* ===== HEADER ===== */}
        <header className="header">
          <div className="header-left">
            <div className="logo">🛡</div>
            <h1>SurakshaSetu</h1>
          </div>

          <div className="header-right">
            <nav className="nav-links">
              <a href="/admin">Home</a>
              <a href="/supervisorrule">Rules</a>
              <a href="/news">News</a>
              <a href="/contact">Contact</a>
            </nav>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </header>

        {/* ===== DASHBOARD BODY ===== */}
        <main className="dashboard-main">
          <div className="dashboard-content">
            <div className="welcome">
              <h2>
                Welcome back,{" "}
                <span>{user?.email?.split("@")[0] || "Admin"}</span> 👋
              </h2>
              <p>
                Manage guards, tasks, schedules, announcements, and training —
                all in one unified control panel.
              </p>
            </div>

            <div className="admin-sections">
              {[
                {
                  title: "🧠 Training Quiz",
                  desc: "Create or edit quiz questions for guards.",
                  link: "/admin/quiz-builder",
                  btn: "Create Quiz",
                },
                {
                  title: "🧾 Task Management",
                  desc: "Add or update guard tasks efficiently.",
                  link: "/tasks",
                  btn: "Assign Task",
                },
                {
                  title: "🚨 Incident Reports",
                  desc: "View guard-submitted incident reports.",
                  link: "/admin/incidents",
                  btn: "Report Incident",
                },
                {
                  title: "📅 Duty Scheduler",
                  desc: "Assign or modify guard duty timings.",
                  link: "/schedule",
                  btn: "Plan Duty",
                },
                {
                  title: "📋 Attendance",
                  desc: "Track and manage daily guard attendance.",
                  link: "/attendance",
                  btn: "Track Attendance",
                },
                {
                  title: "🎥 Training Videos",
                  desc: "Upload and manage guard training videos.",
                  link: "/videos",
                  btn: "Manage Videos",
                },
                {
                  title: "📢 Announcements",
                  desc: "Post important updates for all guards.",
                  link: "/admin/announcements",
                  btn: "Post Announcement",
                },
              ].map((section, i) => (
                <div className="admin-card" key={i}>
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
              <div className="logo">🛡</div>
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

        .admin-dashboard {
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
        .admin-sections {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 35px;
        }

        .admin-card {
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 16px;
          padding: 30px 25px;
          text-align: center;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
        }

        .admin-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 35px rgba(0, 0, 0, 0.12);
        }

        .admin-card h3 {
          color: #111;
          font-size: 1.3rem;
          margin-bottom: 8px;
        }

        .admin-card p {
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