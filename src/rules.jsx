import React from "react";

export default function Rules() {
  const dutyRules = [
    {
      title: "1. Punctuality and Attendance",
      description:
        "Guards must report on duty 15 minutes before their shift starts and should never leave the post without permission or replacement.",
    },
    {
      title: "2. Uniform and Identification",
      description:
        "Guards must wear a clean and complete uniform, carry their ID card at all times, and maintain a disciplined appearance.",
    },
    {
      title: "3. Duty Discipline",
      description:
        "Sleeping, gossiping, or using mobile phones during duty hours is strictly prohibited. Guards must stay alert and focused.",
    },
    {
      title: "4. Access Control",
      description:
        "No unauthorized person should be allowed entry. Always verify ID cards, visitor passes, and maintain a proper entry log.",
    },
    {
      title: "5. Incident Reporting",
      description:
        "Any suspicious activity, damage, or safety hazard must be reported immediately to the supervisor or admin on duty.",
    },
    {
      title: "6. Fire and Safety Awareness",
      description:
        "Guards must know the location of fire extinguishers, exits, and electrical panels and act promptly during emergencies.",
    },
    {
      title: "7. Respectful Conduct",
      description:
        "Treat staff, visitors, and colleagues with respect. Avoid unnecessary arguments or rude behavior.",
    },
    {
      title: "8. Confidentiality",
      description:
        "Information about the premises, staff, or security arrangements must not be shared with outsiders.",
    },
    {
      title: "9. Night Duty Protocol",
      description:
        "Guards on night duty must carry a flashlight, ensure all lights and CCTV are functional, and perform hourly patrol rounds.",
    },
    {
      title: "10. Handover Procedure",
      description:
        "Before leaving duty, guards must hand over logbooks, keys, and duty reports to the next guard and ensure a smooth transition.",
    },
  ];

  return (
    <>
      {/* ===== HEADER ===== */}
      <header className="header">
        <div className="header-left">
          <div className="logo">🛡</div>
          <h1>SurakshaSetu</h1>
        </div>
        <nav className="nav-links">
          <a href="/guard">Home</a>
          <a href="/rules" className="active">
            Rules
          </a>
          <a href="/news">News</a>
          <a href="/contact">Contact</a>
        </nav>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main className="rules-container">
        <h2>📜 Security Guard Duty Rules & Guidelines</h2>
        <p className="intro">
          Every guard is expected to follow these guidelines to maintain safety, discipline, and efficiency during duty.
        </p>

        <div className="rules-list">
          {dutyRules.map((rule, index) => (
            <div key={index} className="rule-card">
              <h3>{rule.title}</h3>
              <p>{rule.description}</p>
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

        /* ===== RULES SECTION ===== */
        .rules-container {
          max-width: 1000px;
          margin: 100px auto;
          text-align: center;
          padding: 20px;
        }

        .rules-container h2 {
          color: #203a43;
          margin-bottom: 15px;
          font-size: 1.8rem;
        }

        .intro {
          color: #555;
          font-size: 1rem;
          margin-bottom: 35px;
        }

        .rules-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 25px;
        }

        .rule-card {
          background: white;
          border-radius: 12px;
          padding: 25px;
          box-shadow: 0 6px 15px rgba(0,0,0,0.1);
          text-align: left;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .rule-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }

        .rule-card h3 {
          color: #0f2027;
          font-size: 1.1rem;
          margin-bottom: 8px;
        }

        .rule-card p {
          color: #555;
          font-size: 0.95rem;
          line-height: 1.5;
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

        .footer-links a {
          color: #ddd;
          text-decoration: none;
          transition: 0.3s;
        }

        .footer-links a:hover {
          color: #fca311;
        }

        .footer-social a {
          color: #fff;
          font-size: 1.3rem;
          transition: transform 0.3s ease, color 0.3s ease;
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

        @media (max-width: 768px) {
          .header {
            flex-direction: column;
            padding: 20px;
          }
          .nav-links {
            flex-wrap: wrap;
            justify-content: center;
          }
          .footer-content {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
}
