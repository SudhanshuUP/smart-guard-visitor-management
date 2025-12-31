import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function AdminAnnouncements() {
  const [message, setMessage] = useState("");
  const [announcements, setAnnouncements] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Popup state
  const [popup, setPopup] = useState({ show: false, type: "", text: "" });

  // Show popup (success or error)
  function showPopup(type, text) {
    setPopup({ show: true, type, text });
    setTimeout(() => setPopup({ show: false, type: "", text: "" }), 2000);
  }

  useEffect(() => {
    fetchAnnouncements();

    const channel = supabase
      .channel("realtime:announcements-admin")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "announcements" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setAnnouncements((prev) => [payload.new, ...prev]);
          } else if (payload.eventType === "UPDATE") {
            setAnnouncements((prev) =>
              prev.map((a) => (a.id === payload.new.id ? payload.new : a))
            );
          } else if (payload.eventType === "DELETE") {
            setAnnouncements((prev) =>
              prev.filter((a) => a.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  async function fetchAnnouncements() {
    const { data, error } = await supabase
      .from("announcements")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setAnnouncements(data);
  }

  async function addAnnouncement() {
    if (!message.trim()) {
      showPopup("error", "Please write something before posting!");
      return;
    }

    const user = (await supabase.auth.getUser()).data.user;

    const { error } = await supabase
      .from("announcements")
      .insert([{ message: message.trim(), created_by: user?.id || null }]);

    if (error) showPopup("error", error.message);
    else {
      setMessage("");
      showPopup("success", "Announcement posted successfully!");
    }
  }

  async function deleteAnnouncement(id) {
    if (!window.confirm("Are you sure you want to delete this announcement?"))
      return;

    const { error } = await supabase.from("announcements").delete().eq("id", id);

    if (error) showPopup("error", error.message);
    else showPopup("success", "Announcement deleted!");
  }

  function startEditing(id, text) {
    setEditingId(id);
    setEditingText(text);
  }

  async function saveEdit(id) {
    if (!editingText.trim()) {
      showPopup("error", "Message cannot be empty!");
      return;
    }

    const { error } = await supabase
      .from("announcements")
      .update({ message: editingText })
      .eq("id", id);

    if (error) showPopup("error", error.message);
    else {
      setEditingId(null);
      showPopup("success", "Announcement updated!");
    }
  }

  return (
    <>
      {/* POPUP */}
      {popup.show && (
        <div className={`popup ${popup.type}`}>
          {popup.type === "success" ? "✔️" : "⚠️"} {popup.text}
        </div>
      )}

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

      {/* ===== MAIN SECTION ===== */}
      <main className="announcement-container">
        <h2>📢 Official Announcements</h2>
        <p className="subtext">
          Post important updates and information for all guards and staff.
        </p>

        {/* Add new announcement */}
        <div className="announcement-input">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your announcement..."
            rows="3"
          ></textarea>
          <button onClick={addAnnouncement} className="btn-add">
            ➕ Post Announcement
          </button>
        </div>

        {/* Announcement List */}
        <div className="announcement-list">
          {announcements.length === 0 ? (
            <p className="no-data">No announcements yet.</p>
          ) : (
            announcements.map((a) => (
              <div key={a.id} className="announcement-card">
                {editingId === a.id ? (
                  <div className="edit-mode">
                    <textarea
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      rows="2"
                    ></textarea>
                    <div className="edit-actions">
                      <button
                        onClick={() => saveEdit(a.id)}
                        className="btn-save"
                      >
                        💾 Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="btn-cancel"
                      >
                        ❌ Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="announcement-header">
                      <h4>📜 Announcement</h4>
                      <small>
                        {new Date(a.created_at).toLocaleString("en-IN", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </small>
                    </div>

                    <p className="announcement-text">{a.message}</p>

                    <div className="announcement-actions">
                      <button
                        onClick={() => startEditing(a.id, a.message)}
                        className="btn-edit"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => deleteAnnouncement(a.id)}
                        className="btn-delete"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </main>

      {/* ===== POPUP + ALL STYLES BELOW ===== */}
      <style>{`
        * {
          box-sizing: border-box;
          font-family: "Poppins", sans-serif;
        }

        /* ===== POPUP ===== */
        .popup {
          position: fixed;
          top: 20px;
          right: 20px;
          padding: 12px 22px;
          border-radius: 8px;
          color: white;
          font-weight: 600;
          z-index: 9999;
          animation: fadeInOut 2s ease forwards;
        }

        .popup.success {
          background: #2ecc71;
          box-shadow: 0 4px 12px rgba(46, 204, 113, 0.4);
        }

        .popup.error {
          background: #e63946;
          box-shadow: 0 4px 12px rgba(230, 57, 70, 0.4);
        }

        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateX(30px); }
          10% { opacity: 1; transform: translateX(0); }
          90% { opacity: 1; transform: translateX(0); }
          100% { opacity: 0; transform: translateX(30px); }
        }
      `}</style>
 


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
          © {new Date().getFullYear()} <span>SurakshaSetu</span>. All rights reserved.
        </p>
      </footer>

      {/* ===== STYLES ===== */}
      <style>{`
        * {
          box-sizing: border-box;
          font-family: "Poppins", sans-serif;
        }

        body {
          background: #f4f6f9;
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

        .nav-links {
          display: flex;
          gap: 25px;
        }

        .nav-links a {
          color: white;
          text-decoration: none;
          font-weight: 500;
          transition: 0.3s;
        }

        .nav-links a:hover {
          color: #fca311;
        }

        /* ===== MAIN ===== */
        .announcement-container {
          max-width: 850px;
          margin: 100px auto;
          background: white;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
        }

        .announcement-container h2 {
          text-align: center;
          color: #203a43;
        }

        .subtext {
          text-align: center;
          color: #777;
          margin-bottom: 25px;
        }

        .announcement-input textarea {
          width: 100%;
          padding: 14px;
          border-radius: 8px;
          border: 1px solid #ccc;
          resize: none;
          font-size: 15px;
        }

        .btn-add {
          display: block;
          background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
          color: white;
          border: none;
          padding: 10px 22px;
          border-radius: 8px;
          font-weight: 600;
          margin-top: 10px;
          cursor: pointer;
          transition: 0.3s;
        }

        .btn-add:hover {
          background: #000;
        }

        .announcement-list {
          margin-top: 35px;
        }

        .announcement-card {
          background: #f8f9fb;
          border-left: 5px solid #203a43;
          padding: 16px 20px;
          border-radius: 10px;
          margin-bottom: 18px;
          box-shadow: 0 3px 8px rgba(0,0,0,0.08);
          transition: all 0.3s ease;
        }

        .announcement-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .announcement-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #203a43;
          margin-bottom: 6px;
        }

        .announcement-text {
          font-size: 15px;
          color: #333;
          margin: 8px 0;
          line-height: 1.5;
        }

        .announcement-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
        }

        .btn-edit,
        .btn-delete,
        .btn-save,
        .btn-cancel {
          padding: 6px 12px;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
        }

        .btn-edit {
          background: #2d6cdf;
          color: white;
        }

        .btn-edit:hover {
          background: #1a4cb3;
        }

        .btn-delete {
          background: #e63946;
          color: white;
        }

        .btn-delete:hover {
          background: #c1121f;
        }

        .btn-save {
          background: #2ecc71;
          color: white;
        }

        .btn-cancel {
          background: #adb5bd;
          color: white;
        }

        .edit-mode textarea {
          width: 100%;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 6px;
        }

        .edit-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 8px;
        }

        .no-data {
          text-align: center;
          color: #777;
          margin-top: 20px;
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

          .announcement-container {
            padding: 25px;
          }

          .announcement-header h4 {
            font-size: 1rem;
          }
        }
      `}</style>
    </>
  );
}
