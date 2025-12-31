import React, { useEffect, useState } from "react";

export default function News() {
  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {
    // Static + Real articles fetched manually (you can replace later with API if needed)
    setNewsItems([
      {
        title: "India’s Cyber Fraud Epidemic: ₹22,845 Crore Lost in 2024",
        source: "Times of India",
        date: "Oct 30, 2024",
        url: "https://timesofindia.indiatimes.com/business/cybersecurity/indias-cyber-fraud-epidemic-rs-22845-crore-lost-in-just-a-year-206-jump-from-previous-year-says-government/articleshow/122840099.cms",
        description:
          "India reported a massive 206% rise in cyber fraud cases this year, with total losses exceeding ₹22,845 crore — highlighting an urgent need for secure digital infrastructure.",
      },
      {
        title: "India Bets on AI to Build $10 Billion Cybersecurity Firm by 2030",
        source: "Business Standard",
        date: "July 30, 2024",
        url: "https://www.business-standard.com/companies/news/india-bets-on-ai-to-build-first-10-billion-cybersecurity-firm-125073001444_1.html",
        description:
          "India is pushing to establish a global AI-first cybersecurity firm by 2030, aiming to position the country as a key player in digital defense innovation.",
      },
      {
        title: "Pakistan’s Transparent Tribe Targets Indian Defence with Linux Malware",
        source: "Hackread",
        date: "Sept 4, 2024",
        url: "https://hackread.com/pakistan-transparent-tribe-indian-defence-linux-malware/",
        description:
          "APT36 (Transparent Tribe), a Pakistan-based hacker group, has deployed Linux-based malware to target Indian defence agencies using phishing campaigns.",
      },
      {
        title: "UK Recognizes Data Centers as Critical Infrastructure",
        source: "TechRadar",
        date: "Aug 2024",
        url: "https://www.techradar.com/pro/strengthening-the-uks-data-center-infrastructure",
        description:
          "The UK government classified data centers as Critical National Infrastructure (CNI), emphasizing their vulnerability to IoT and HVAC attacks.",
      },
      {
        title: "IT Secretary: India Must Start Paying for Cybersecurity",
        source: "Hindustan Times",
        date: "Nov 2024",
        url: "https://www.hindustantimes.com/india-news/indian-market-must-start-paying-for-cybersecurity-it-secretary-s-krishnan-101752239196585.html",
        description:
          "IT Secretary S. Krishnan highlighted that India's cybersecurity market must evolve, urging local institutions to invest in protection systems.",
      },
      {
        title: "Dell iDRAC10 Review: Smarter Remote Server Management",
        source: "ITPro",
        date: "Aug 2024",
        url: "https://www.itpro.com/infrastructure/servers-and-storage/dell-idrac10-review-the-best-remote-server-management-solution-just-got-even-better",
        description:
          "Dell’s new iDRAC10 platform improves remote server monitoring with AI-enhanced analytics and better environmental data visualization.",
      },
    ]);
  }, []);

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
          <a href="/news" className="active">
            News
          </a>
          <a href="/contact">Contact</a>
        </nav>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main className="news-container">
        <h2>📰 Latest Security & Infrastructure News</h2>

        <div className="news-grid">
          {newsItems.map((news, index) => (
            <div key={index} className="news-card">
              <h3>{news.title}</h3>
              <p className="news-meta">
                <b>{news.source}</b> • {news.date}
              </p>
              <p>{news.description}</p>
              <a href={news.url} target="_blank" rel="noopener noreferrer" className="read-more">
                🔗 Read Full Article
              </a>
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

        /* ===== NEWS SECTION ===== */
        .news-container {
          max-width: 1100px;
          margin: 100px auto;
          text-align: center;
          padding: 20px;
        }

        .news-container h2 {
          color: #203a43;
          margin-bottom: 30px;
        }

        .news-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 25px;
        }

        .news-card {
          background: white;
          border-radius: 14px;
          padding: 25px;
          box-shadow: 0 6px 15px rgba(0,0,0,0.1);
          text-align: left;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .news-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }

        .news-card h3 {
          font-size: 1.1rem;
          margin-bottom: 10px;
          color: #0f2027;
        }

        .news-meta {
          color: #888;
          font-size: 0.9rem;
          margin-bottom: 10px;
        }

        .read-more {
          display: inline-block;
          margin-top: 10px;
          color: #fca311;
          font-weight: 600;
          text-decoration: none;
          transition: 0.3s;
        }

        .read-more:hover {
          color: #203a43;
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
