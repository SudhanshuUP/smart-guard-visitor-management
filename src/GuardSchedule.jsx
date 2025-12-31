import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function GuardSchedule() {
  const [schedule, setSchedule] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserAndSchedule();
  }, []);

  async function getUserAndSchedule() {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user) {
      alert("Please log in first!");
      window.location.href = "/login";
      return;
    }
    setUser(userData.user);
    fetchSchedule(userData.user.email);
  }

  async function fetchSchedule() {
    const { data, error } = await supabase
      .from("duty_schedule")
      .select("*")
      .order("date", { ascending: true });

    if (error) {
      console.error("Error fetching schedule:", error.message);
      alert("Failed to load schedule: " + error.message);
    } else {
      setSchedule(data || []);
    }

    setLoading(false);
  }

  return (
    <div className="guard-page">
      {/* ===== HEADER ===== */}
      <header className="header">
        <div className="header-left">
          <div className="logo">🛡</div>
          <h1>SurakshaSetu</h1>
        </div>
        <div className="header-right">
          <nav className="nav-links">
            <a href="/guard">Home</a>
            {/* <a href="/guard-tasks">Tasks</a> */}
            {/* <a href="/guard-schedule" className="active">Schedule</a> */}
            <a href="/rules">Rules</a>
            <a href="/news">News</a>
            <a href="/contact">Contact</a>
          </nav>
        </div>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main className="schedule-container">
        <h2>📅 Duty Schedule</h2>
        <p>Check your assigned duty shifts below.</p>

        {loading ? (
          <p className="empty-text">Loading schedule...</p>
        ) : schedule.length === 0 ? (
          <p className="empty-text">No duty assigned yet.</p>
        ) : (
          <div className="schedule-scroll">
            {schedule.map((s) => (
              <div key={s.id} className="schedule-card">
                <h3>{s.guard_name}</h3>
                <div className="schedule-details">
                  <p><b>Date:</b> {s.date}</p>
                  <p><b>Shift:</b> {s.shift_time}</p>
                  <p><b>Location:</b> {s.location}</p>
                </div>
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

        .guard-page {
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

        .nav-links a.active::after {
          width: 100%;
        }

        /* ===== MAIN ===== */
        .schedule-container {
          flex: 1;
          width: 95%;
          margin: 70px auto;
          background: white;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }

        h2, h3 {
          color: #203a43;
          font-weight: 700;
          margin-bottom: 20px;
        }

        p {
          color: #555;
          margin-bottom: 10px;
        }

        .empty-text {
          text-align: center;
          color: #666;
          font-size: 1.05rem;
        }

        .schedule-scroll {
          display: flex;
          overflow-x: auto;
          gap: 25px;
          padding-bottom: 10px;
          scrollbar-width: thin;
        }

        .schedule-scroll::-webkit-scrollbar {
          height: 10px;
        }

        .schedule-scroll::-webkit-scrollbar-thumb {
          background: #ccc;
          border-radius: 10px;
        }

        .schedule-card {
          min-width: 380px;
          flex: 0 0 auto;
          background: #f9fafc;
          border-radius: 16px;
          padding: 24px;
          border: 1px solid #ddd;
          transition: all 0.3s ease;
          box-shadow: 0 6px 12px rgba(0,0,0,0.1);
        }

        .schedule-card:hover {
          border-color: #fca311;
          transform: translateY(-4px);
        }

        .schedule-details {
          margin-top: 10px;
          color: #444;
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
          .schedule-scroll {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
