import React, { useState } from "react";
import { supabase } from "./supabaseClient";

export default function GuardIncident() {
  const [guardName, setGuardName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    let photoUrl = null;

    // ✅ Upload image to Supabase Storage
    if (file) {
      try {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}_${Math.random()
          .toString(36)
          .substring(2)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("incident-photos")
          .upload(fileName, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          alert("Error uploading image: " + uploadError.message);
          setLoading(false);
          return;
        }

        const { data: publicUrlData } = supabase.storage
          .from("incident-photos")
          .getPublicUrl(fileName);

        photoUrl = publicUrlData.publicUrl;
      } catch (err) {
        alert("Unexpected upload error: " + err.message);
        setLoading(false);
        return;
      }
    }

    // ✅ Insert incident into Supabase table
    const { error: insertError } = await supabase
      .from("incidents")
      .insert([
        {
          guard_name: guardName,
          description,
          photo_url: photoUrl,
          created_at: new Date(),
        },
      ]);

    if (insertError) {
      alert("Error submitting report: " + insertError.message);
    } else {
      alert("🚨 Incident sent to admin successfully!");
      setGuardName("");
      setDescription("");
      setFile(null);
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
            <a href="/guard-dashboard">Home</a>
            <a href="/guard-tasks">Tasks</a>
            <a href="/guard-schedule">Schedule</a>
            <a href="/guard-announcements">Announcements</a>
            <a href="/guard-incident" className="active">
              Incident
            </a>
            <a href="/rules">Rules</a>
          </nav>
        </div>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main className="incident-container">
        <h2>🚨 Report an Incident</h2>
        <p>Please fill in the details below to report any unusual activity.</p>

        <form onSubmit={handleSubmit} className="incident-form">
          <input
            type="text"
            placeholder="👮 Your Name"
            value={guardName}
            onChange={(e) => setGuardName(e.target.value)}
            required
          />
          <textarea
            placeholder="📝 Describe what happened..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Incident"}
          </button>
        </form>
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

        /* ===== MAIN CONTENT ===== */
        .incident-container {
          flex: 1;
          width: 95%;
          margin: 70px auto;
          background: white;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          text-align: center;
        }

        h2 {
          color: #203a43;
          font-weight: 700;
          margin-bottom: 20px;
        }

        p {
          color: #555;
          margin-bottom: 20px;
        }

        .incident-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
          align-items: center;
        }

        input, textarea {
          width: 80%;
          padding: 12px 15px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 1rem;
          background: #fafafa;
        }

        textarea {
          resize: none;
          min-height: 120px;
        }

        input[type="file"] {
          background: #fff;
          border: 1px dashed #bbb;
          padding: 10px;
          cursor: pointer;
          width: 80%;
        }

        button {
          background: #fca311;
          color: #203a43;
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          font-size: 1rem;
          transition: 0.3s;
        }

        button:hover {
          background: #e28b06;
          color: white;
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
          .incident-container input,
          .incident-container textarea,
          .incident-container input[type="file"] {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
