import React from "react";

export default function SupervisorRules() {
  return (
    <>
      <div className="rules-page">
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
          </div>
        </header>

        {/* ===== MAIN CONTENT ===== */}
        <main className="rules-container">
          <h2 className="page-title">Supervisor Rules & Responsibilities</h2>
          <p className="intro">
            Supervisors play a crucial role in ensuring discipline, coordination, and safety
            across all security operations. Please adhere to the following guidelines at all times.
          </p>

          <section className="rules-section">
            <h3>🔹 1. General Conduct</h3>
            <ul>
              <li>Maintain professionalism and lead by example in all duties.</li>
              <li>Ensure all guards report on time and in proper uniform.</li>
              <li>Avoid misuse of authority or involvement in disputes.</li>
              <li>Maintain a calm and respectful attitude in all situations.</li>
            </ul>
          </section>

          <section className="rules-section">
            <h3>🔹 2. Duty & Supervision</h3>
            <ul>
              <li>Monitor guard attendance and duty rotation daily.</li>
              <li>Assign patrol areas and ensure coverage without overlap.</li>
              <li>Verify the proper functioning of surveillance and alert systems.</li>
              <li>Maintain records of all shifts, activities, and incidents.</li>
            </ul>
          </section>

          <section className="rules-section">
            <h3>🔹 3. Incident Management</h3>
            <ul>
              <li>Immediately respond to any emergency or suspicious activity.</li>
              <li>File detailed incident reports in the system within 24 hours.</li>
              <li>Ensure evidence (like CCTV footage) is preserved for review.</li>
              <li>Coordinate with higher authorities for serious incidents.</li>
            </ul>
          </section>

          <section className="rules-section">
            <h3>🔹 4. Communication & Reporting</h3>
            <ul>
              <li>Submit daily summaries to the admin dashboard.</li>
              <li>Maintain clear communication with guards and management.</li>
              <li>Report any disciplinary issues or absences immediately.</li>
              <li>Encourage guards to report suspicious activity promptly.</li>
            </ul>
          </section>

          <section className="rules-section">
            <h3>🔹 5. Safety & Compliance</h3>
            <ul>
              <li>Ensure all guards follow safety protocols at all posts.</li>
              <li>Conduct regular training and fire-drill simulations.</li>
              <li>Keep all security devices (walkie-talkies, alarms) functional.</li>
              <li>Comply with all institutional and legal security standards.</li>
            </ul>
          </section>

          <p className="note">
            <strong>Note:</strong> Failure to comply with these rules may lead to disciplinary action,
            including suspension of duty or reassignment.
          </p>
        </main>

        {/* ===== FOOTER ===== */}
        <footer className="footer">
          <div className="footer-inner">
            <div className="footer-left">
              <div className="logo">🛡</div>
              <h2>SurakshaSetu</h2>
            </div>

            <nav className="footer-links">
              <a href="/supervisor-dashboard">Home</a>
              <a href="/rules">Rules</a>
              <a href="/news">News</a>
              <a href="/contact">Contact</a>
            </nav>

            <p className="footer-right">
              © {new Date().getFullYear()} SurakshaSetu — Leadership in Security.
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

        .rules-page {
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

        /* ===== MAIN CONTENT ===== */
        .rules-container {
          flex: 1;
          max-width: 900px;
          margin: 60px auto;
          padding: 40px;
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .page-title {
          font-size: 2rem;
          color: #0f2027;
          margin-bottom: 15px;
          text-align: center;
        }

        .intro {
          color: #444;
          text-align: center;
          margin-bottom: 40px;
          font-size: 1.05rem;
        }

        .rules-section {
          margin-bottom: 30px;
        }

        .rules-section h3 {
          color: #203a43;
          margin-bottom: 10px;
        }

        ul {
          list-style-type: disc;
          margin-left: 25px;
          color: #333;
          line-height: 1.6;
        }

        .note {
          background: #fca3111a;
          padding: 15px 20px;
          border-left: 4px solid #fca311;
          border-radius: 8px;
          color: #333;
          margin-top: 20px;
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

          .rules-container {
            padding: 25px;
            margin: 30px 15px;
          }
        }
      `}</style>
    </>
  );
}
