import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function AdminAttendance() {
  const [guards, setGuards] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [loading, setLoading] = useState(false);

  // Fetch guards from Supabase
  useEffect(() => {
    async function fetchGuards() {
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, role")
        .eq("role", "guard");
      if (error) console.error("Error fetching guards:", error);
      else setGuards(data);
    }
    fetchGuards();
  }, []);

  // Toggle attendance (Present / Absent)
  const toggleAttendance = (guard, status) => {
    setAttendance((prev) => ({
      ...prev,
      [guard]: prev[guard] === status ? null : status,
    }));
  };

  // Save attendance to Supabase
  const saveAttendance = async () => {
    if (Object.keys(attendance).length === 0) {
      alert("⚠ Please mark attendance before saving!");
      return;
    }

    setLoading(true);
    const records = Object.entries(attendance)
      .filter(([_, status]) => status)
      .map(([guard_name, status]) => ({
        guard_name,
        date,
        status,
        marked_by: "Admin",
      }));

    const { error } = await supabase.from("attendance").insert(records);
    setLoading(false);

    if (error) alert("❌ Error saving attendance: " + error.message);
    else {
      alert("✅ Attendance saved successfully!");
      setAttendance({});
    }
  };

  return (
    <>
      {/* ===== HEADER ===== */}
      <header className="header">
        <div className="header-left">
          <div className="logo">🛡</div>
          <h1>SurakshaSetu</h1>
        </div>

        <nav className="nav-links">
          <a href="/admin">Home</a>
          <a href="/rules">Rules</a>
          <a href="/news">News</a>
          <a href="/contact">Contact</a>
        </nav>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main className="attendance-container">
        <h2>📋 Attendance Management (Admin)</h2>

        <div className="date-picker">
          <label>Date: </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="attendance-table-wrapper">
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Guard Name</th>
                <th>Attendance</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {guards.length === 0 ? (
                <tr>
                  <td colSpan="3">No guards found.</td>
                </tr>
              ) : (
                guards.map((g) => {
                  const status = attendance[g.full_name];
                  return (
                    <tr
                      key={g.full_name}
                      className={
                        status === "Present"
                          ? "row-present"
                          : status === "Absent"
                          ? "row-absent"
                          : ""
                      }
                    >
                      <td>{g.full_name}</td>
                      <td>
                        <div className="toggle-buttons">
                          <button
                            className={`toggle present ${
                              status === "Present" ? "active" : ""
                            }`}
                            onClick={() =>
                              toggleAttendance(g.full_name, "Present")
                            }
                          >
                            Present
                          </button>
                          <button
                            className={`toggle absent ${
                              status === "Absent" ? "active" : ""
                            }`}
                            onClick={() =>
                              toggleAttendance(g.full_name, "Absent")
                            }
                          >
                            Absent
                          </button>
                        </div>
                      </td>
                      <td>
                        {status ? (
                          <span
                            className={`status-label ${
                              status === "Present"
                                ? "status-present"
                                : "status-absent"
                            }`}
                          >
                            {status}
                          </span>
                        ) : (
                          <span className="status-none">Not Marked</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <button
          onClick={saveAttendance}
          className="save-btn"
          disabled={loading}
        >
          {loading ? "Saving..." : "💾 Save Attendance"}
        </button>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-left">
            <h2>SurakshaSetu</h2>
            <p>Empowering secure and smart guard management.</p>
          </div>

          <div className="footer-links">
            <a href="/about">About</a>
            <a href="/privacy">Privacy</a>
            <a href="/support">Support</a>
            <a href="/contact">Contact</a>
          </div>

          <div className="footer-social">
            <a href="#">🌐</a>
            <a href="#">🐦</a>
            <a href="#">💼</a>
            <a href="#">📸</a>
          </div>
        </div>

        <p className="footer-bottom">
          © {new Date().getFullYear()} <span>SurakshaSetu</span>. All rights
          reserved.
        </p>
      </footer>

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
          gap: 12px;
        }

        .logo {
          font-size: 1.8rem;
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

        /* ===== MAIN ===== */
        .attendance-container {
          max-width: 950px;
          margin: 100px auto;
          background: white;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
          text-align: center;
        }

        .date-picker {
          margin-bottom: 25px;
          font-weight: 500;
        }

        .attendance-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 25px;
        }

        th, td {
          border: 1px solid #ddd;
          padding: 14px;
          text-align: center;
        }

        th {
          background: #203a43;
          color: white;
        }

        tr:nth-child(even) {
          background: #f9f9f9;
        }

        .row-present {
          background-color: #e8f9ee;
        }

        .row-absent {
          background-color: #fdecea;
        }

        .toggle-buttons {
          display: flex;
          justify-content: center;
          gap: 12px;
        }

        .toggle {
          padding: 10px 20px;
          border-radius: 25px;
          border: none;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .toggle.present {
          background: #2ecc71;
          color: white;
        }

        .toggle.absent {
          background: #e63946;
          color: white;
        }

        .toggle.active {
          transform: scale(1.05);
          box-shadow: 0 0 0 3px rgba(0,0,0,0.15);
        }

        .status-label {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 8px;
          font-weight: 600;
        }

        .status-present {
          background: #2ecc71;
          color: white;
        }

        .status-absent {
          background: #e74c3c;
          color: white;
        }

        .status-none {
          color: #777;
          font-style: italic;
        }

        .save-btn {
          background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
          color: white;
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
        }

        .save-btn:hover {
          background: #000;
        }

        /* ===== FOOTER ===== */
        .footer {
          background: #0f2027;
          color: white;
          padding: 40px 60px 20px;
          text-align: center;
          margin-top: 60px;
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 30px;
          margin-bottom: 20px;
        }

        .footer-left h2 {
          font-size: 1.5rem;
          color: #fca311;
          margin-bottom: 8px;
        }

        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .footer-links a {
          color: #ddd;
          text-decoration: none;
          transition: 0.3s;
        }

        .footer-links a:hover {
          color: #fca311;
        }

        .footer-social {
          display: flex;
          gap: 15px;
          font-size: 1.4rem;
        }

        .footer-social a:hover {
          transform: scale(1.2);
          color: #fca311;
        }

        .footer-bottom {
          color: #aaa;
          font-size: 0.9rem;
          margin-top: 10px;
        }

        .footer-bottom span {
          color: #fca311;
        }

        @media (max-width: 768px) {
          .header {
            flex-direction: column;
            padding: 20px;
          }
          .attendance-container {
            padding: 25px;
          }
          .toggle-buttons {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
}
