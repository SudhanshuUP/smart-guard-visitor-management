import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

export default function AdminDutyScheduler() {
  const [schedules, setSchedules] = useState([]);
  const [guards, setGuards] = useState([]);
  const [errors, setErrors] = useState({});
  const [newSchedule, setNewSchedule] = useState({
    guard_id: "",
    guard_name: "",
    date: "",
    shift_time: "",
    location: "",
  });

  useEffect(() => {
    fetchSchedules();
    fetchGuards();
  }, []);

  // =========================
  // FETCH SCHEDULES
  // =========================
  async function fetchSchedules() {
    const { data, error } = await supabase
      .from("duty_schedule")
      .select("*")
      .order("date", { ascending: true });

    if (!error) setSchedules(data);
  }

  // =========================
  // FETCH REGISTERED GUARDS
  // =========================
  async function fetchGuards() {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, full_name")
      .eq("role", "guard");

    if (!error) setGuards(data);
  }

  // =========================
  // VALIDATION
  // =========================
  function validateForm() {
    const err = {};

    if (!newSchedule.guard_id) {
      err.guard_id = "Please select a guard.";
    }

    if (!newSchedule.date) {
      err.date = "Date is required.";
    }

    if (!newSchedule.shift_time.trim()) {
      err.shift_time = "Shift time required.";
    }

    if (!newSchedule.location.trim()) {
      err.location = "Location required.";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  }

  // =========================
  // ADD SCHEDULE
  // =========================
  async function addSchedule(e) {
    e.preventDefault();

    if (!validateForm()) {
      alert("❌ Fix the errors before submitting.");
      return;
    }

    const selectedGuard = guards.find((g) => g.id === newSchedule.guard_id);

    const scheduleData = {
      guard_id: newSchedule.guard_id,
      guard_name: selectedGuard.full_name,
      date: newSchedule.date,
      shift_time: newSchedule.shift_time,
      location: newSchedule.location,
    };

    const { error } = await supabase.from("duty_schedule").insert([scheduleData]);

    if (error) alert("Error: " + error.message);
    else {
      alert("✅ Duty Added Successfully!");
      setNewSchedule({
        guard_id: "",
        guard_name: "",
        date: "",
        shift_time: "",
        location: "",
      });
      fetchSchedules();
    }
  }

  // =========================
  // DELETE SCHEDULE
  // =========================
  async function deleteSchedule(id) {
    if (!window.confirm("Delete this schedule?")) return;

    await supabase.from("duty_schedule").delete().eq("id", id);
    fetchSchedules();
  }

  return (
    <>
      <main className="scheduler-container">
        <h2>📅 Duty Scheduler (Admin)</h2>

        {/* ADD SCHEDULE FORM */}
        <form onSubmit={addSchedule} className="duty-form">
          
          {/* SELECT GUARD */}
          <select
            value={newSchedule.guard_id}
            onChange={(e) =>
              setNewSchedule({
                ...newSchedule,
                guard_id: e.target.value,
              })
            }
          >
            <option value="">Select Guard</option>
            {guards.map((g) => (
              <option key={g.id} value={g.id}>
                {g.full_name}
              </option>
            ))}
          </select>

          {errors.guard_id && <p className="error-text">{errors.guard_id}</p>}

          {/* DATE */}
          <input
            type="date"
            value={newSchedule.date}
            onChange={(e) =>
              setNewSchedule({ ...newSchedule, date: e.target.value })
            }
          />
          {errors.date && <p className="error-text">{errors.date}</p>}

          {/* SHIFT */}
          <input
            type="text"
            placeholder="Shift Time (e.g., 8 AM - 4 PM)"
            value={newSchedule.shift_time}
            onChange={(e) =>
              setNewSchedule({ ...newSchedule, shift_time: e.target.value })
            }
          />
          {errors.shift_time && (
            <p className="error-text">{errors.shift_time}</p>
          )}

          {/* LOCATION */}
          <input
            type="text"
            placeholder="Location"
            value={newSchedule.location}
            onChange={(e) =>
              setNewSchedule({ ...newSchedule, location: e.target.value })
            }
          />
          {errors.location && (
            <p className="error-text">{errors.location}</p>
          )}

          <button type="submit" className="btn-add">
            ➕ Add Duty
          </button>
        </form>

        {/* LIST OF DUTIES */}
        <h3>🧾 Scheduled Duties</h3>

        <div className="duty-grid">
          {schedules.map((s) => (
            <div key={s.id} className="duty-card">
              <h4>{s.guard_name}</h4>
              <p><b>Date:</b> {s.date}</p>
              <p><b>Shift:</b> {s.shift_time}</p>
              <p><b>Location:</b> {s.location}</p>

              <button
                onClick={() => deleteSchedule(s.id)}
                className="btn-delete"
              >
                🗑 Delete
              </button>
            </div>
          ))}
        </div>
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
          transition: 0.3s;
          position: relative;
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

        /* ===== MAIN CONTAINER ===== */
        .scheduler-container {
          max-width: 900px;
          margin: 100px auto;
          background: white;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
          text-align: center;
        }

        h2 {
          margin-bottom: 20px;
          color: #203a43;
        }

        .duty-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 30px;
        }

        input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 1rem;
        }

        .btn-add {
          background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
          color: white;
          padding: 12px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
        }

        .btn-add:hover {
          background: #000;
        }

        /* ===== DUTY GRID ===== */
        .duty-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          margin-top: 20px;
          text-align: left;
        }

        .duty-card {
          background: #f9fafc;
          border: 1px solid #ddd;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .duty-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        }

        .duty-header h4 {
          font-size: 1.1rem;
          color: #203a43;
          margin-bottom: 8px;
        }

        .duty-body p {
          font-size: 0.95rem;
          margin: 6px 0;
        }

        .duty-footer {
          text-align: right;
          margin-top: 10px;
        }

        .btn-delete {
          background: #e63946;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 8px 12px;
          cursor: pointer;
          transition: 0.3s;
        }

        .btn-delete:hover {
          background: #c1121f;
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

        .footer-left p {
          color: #ccc;
          font-size: 0.95rem;
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

        .footer-social a {
          color: #fff;
          text-decoration: none;
          transition: transform 0.3s ease;
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
            gap: 10px;
            padding: 20px;
          }

          .nav-links {
            flex-wrap: wrap;
            justify-content: center;
          }

          .scheduler-container {
            padding: 20px;
          }

          .footer-content {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </>
  );
}
