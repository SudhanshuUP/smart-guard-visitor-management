import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function GuardAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetchAnnouncements();

    // Realtime updates
    const channel = supabase
      .channel("realtime:announcements-guard")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "announcements" },
        (payload) => {
          setAnnouncements((prev) => [payload.new, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchAnnouncements() {
    const { data, error } = await supabase
      .from("announcements")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching announcements:", error.message);
    } else {
      setAnnouncements(data);
    }
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
            <a href="/guard-dashboard">Home</a>
            {/* <a href="/guard-tasks">Tasks</a>
            <a href="/guard-schedule">Schedule</a> */}
            <a href="/guard-announcements" className="active">
              Announcements
            </a>
            <a href="/rules">Rules</a>
            <a href="/contact">Contact</a>
          </nav>
        </div>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main className="announcement-container">
        <h2>📢 Announcements</h2>
        <p>Stay updated with the latest security updates and alerts.</p>

        {announcements.length === 0 ? (
          <p className="empty-text">No announcements yet.</p>
        ) : (
          <div className="announcement-scroll">
            {announcements.map((a) => (
              <div key={a.id} className="announcement-card">
                <h3>{a.title || "Important Update"}</h3>
                <p>{a.message}</p>
                <small>
                  🕒 {new Date(a.created_at).toLocaleString()}
                </small>
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

        .nav-links a:hover::after,
        .nav-links a.active::after {
          width: 100%;
        }

        /* ===== MAIN ===== */
        .announcement-container {
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

        .announcement-scroll {
          display: flex;
          overflow-x: auto;
          gap: 25px;
          padding-bottom: 10px;
          scrollbar-width: thin;
        }

        .announcement-scroll::-webkit-scrollbar {
          height: 10px;
        }

        .announcement-scroll::-webkit-scrollbar-thumb {
          background: #ccc;
          border-radius: 10px;
        }

        .announcement-card {
          min-width: 380px;
          flex: 0 0 auto;
          background: #f9fafc;
          border-radius: 16px;
          padding: 24px;
          border: 1px solid #ddd;
          transition: all 0.3s ease;
          box-shadow: 0 6px 12px rgba(0,0,0,0.1);
        }

        .announcement-card:hover {
          border-color: #fca311;
          transform: translateY(-4px);
        }

        .announcement-card small {
          display: block;
          text-align: right;
          color: #666;
          margin-top: 10px;
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
          .announcement-scroll {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
