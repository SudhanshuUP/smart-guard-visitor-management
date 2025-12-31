import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

export default function AdminTasks() {
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem("tasks")) || []);
  const [guards, setGuards] = useState([]);  
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    guard_name: "",
    task_title: "",
    description: "",
    deadline: "",
    location: "",
    priority: "Medium",
    notes: "",
  });

  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    fetchIncidents();
    fetchGuards();
  }, [tasks]);

  /* 🟦 Load all registered guards from Supabase */
  async function fetchGuards() {
    const { data, error } = await supabase
      .from("profiles")
      .select("full_name, role")
      .eq("role", "guard");

    if (error) console.error("Error loading guards:", error);
    else setGuards(data || []);
  }

  /* 🟥 Load incident reports */
  async function fetchIncidents() {
    const { data, error } = await supabase
      .from("incidents")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error("Error fetching incidents:", error);
    else setIncidents(data);
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  /* 🟨 Add task */
  const addTask = () => {
    const { guard_name, task_title, description, deadline, location } = form;

    if (!guard_name || !task_title || !description || !deadline || !location) {
      alert("⚠ Please fill all required fields!");
      return;
    }

    const newTask = {
      ...form,
      id: Date.now(),
      created_at: new Date().toISOString(),
      status: "Pending",
    };

    setTasks([...tasks, newTask]);

    setForm({
      guard_name: "",
      task_title: "",
      description: "",
      deadline: "",
      location: "",
      priority: "Medium",
      notes: "",
    });
  };

  const deleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((t) => t.id !== id));
    }
  };

  /* Filter guards when typing in search box */
  const filteredGuards = guards.filter((g) =>
    g.full_name.toLowerCase().includes(search.toLowerCase())
  );

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
      <main className="task-container">
        <h2>🧾 Advanced Task Management (Admin)</h2>

        <div className="task-form">

          {/* 🟦 Searchable Guard Dropdown */}
          <div>
            <input
              type="text"
              placeholder="🔍 Search Guard"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ marginBottom: "8px" }}
            />

            <select
              name="guard_name"
              value={form.guard_name}
              onChange={handleChange}
            >
              <option value="">Select Guard</option>

              {filteredGuards.length === 0 && <option>No guards found</option>}

              {filteredGuards.map((g, i) => (
                <option key={i} value={g.full_name}>
                  {g.full_name}
                </option>
              ))}
            </select>
          </div>

          <input
            type="text"
            name="task_title"
            placeholder="📌 Task Title"
            value={form.task_title}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="📝 Task Description"
            value={form.description}
            onChange={handleChange}
          ></textarea>

          <input
            type="date"
            name="deadline"
            value={form.deadline}
            onChange={handleChange}
          />

          <input
            type="text"
            name="location"
            placeholder="📍 Location"
            value={form.location}
            onChange={handleChange}
          />

          <select name="priority" value={form.priority} onChange={handleChange}>
            <option value="Low">🟢 Low Priority</option>
            <option value="Medium">🟡 Medium Priority</option>
            <option value="High">🔴 High Priority</option>
          </select>

          <textarea
            name="notes"
            placeholder="Additional Notes (optional)"
            value={form.notes}
            onChange={handleChange}
          ></textarea>

          <button className="btn-add" onClick={addTask}>
            ➕ Assign Task
          </button>
        </div>

        {/* ===== TASKS LIST ===== */}
        <h3>📋 Current Tasks</h3>

        {tasks.length === 0 ? (
          <p>No tasks added yet.</p>
        ) : (
          <div className="task-grid">
            {tasks.map((t) => (
              <div className={`task-card ${t.priority.toLowerCase()}`} key={t.id}>
                <div className="task-header">
                  <h4>{t.task_title}</h4>
                  <span className={`priority-badge ${t.priority.toLowerCase()}`}>
                    {t.priority}
                  </span>
                </div>

                <div className="task-body">
                  <p><b>👮 Guard:</b> {t.guard_name}</p>
                  <p><b>📅 Deadline:</b> {t.deadline}</p>
                  <p><b>📍 Location:</b> {t.location}</p>
                  <p><b>📝 Description:</b> {t.description}</p>
                  {t.notes && <p><b>🗒 Notes:</b> {t.notes}</p>}
                </div>

                <div className="task-footer">
                  <p className="created-date">🕒 {new Date(t.created_at).toLocaleString()}</p>
                  <button className="btn-delete" onClick={() => deleteTask(t.id)}>🗑 Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===== INCIDENTS ===== */}
        <h3>🚨 Guard Incident Reports</h3>

        {incidents.length === 0 ? (
          <p>No incident reports yet.</p>
        ) : (
          <ul className="incident-list">
            {incidents.map((i) => (
              <li key={i.id}>
                <h4>👮 {i.guard_name}</h4>
                <p>{i.description}</p>
                {i.photo_url && <img src={i.photo_url} alt="Incident" width="220" />}
                <p><small>🕒 {new Date(i.created_at).toLocaleString()}</small></p>
              </li>
            ))}
          </ul>
        )}
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
            <a href="#" aria-label="Facebook">🌐</a>
            <a href="#" aria-label="Twitter">🐦</a>
            <a href="#" aria-label="LinkedIn">💼</a>
            <a href="#" aria-label="Instagram">📸</a>
          </div>
        </div>

        <p className="footer-bottom">
          © {new Date().getFullYear()} <span>SurakshaSetu</span>. All rights reserved.
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

        /* ===== MAIN CONTENT ===== */
        .task-container {
          max-width: 1000px;
          margin: 100px auto;
          background: white;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
          text-align: center;
        }

        .task-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 30px;
        }

        input, textarea, select {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 1rem;
        }

        textarea { resize: none; min-height: 80px; }

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

        .btn-add:hover { background: #000; }

        /* ===== TASK LIST (IMPROVED) ===== */
        .task-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          margin-top: 20px;
          text-align: left;
        }

        .task-card {
          background: #f9fafc;
          border: 1px solid #ddd;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .task-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        }

        .task-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .task-header h4 {
          font-size: 1.1rem;
          color: #203a43;
        }

        .priority-badge {
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .priority-badge.low {
          background: #d4edda;
          color: #155724;
        }

        .priority-badge.medium {
          background: #fff3cd;
          color: #856404;
        }

        .priority-badge.high {
          background: #f8d7da;
          color: #721c24;
        }

        .task-body p {
          margin: 5px 0;
          font-size: 0.95rem;
        }

        .task-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 10px;
        }

        .created-date {
          font-size: 0.85rem;
          color: #666;
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

        .btn-delete:hover { background: #c1121f; }

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

          .task-container {
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
