import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Your message has been sent successfully!");
    setFormData({ name: "", email: "", message: "" });
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
          <a href="/contact" className="active">
            Contact
          </a>
        </nav>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main className="contact-container">
        <h2>📞 Contact Us</h2>
        <p className="intro">
          Have any questions, suggestions, or security concerns?  
          Feel free to reach out — our team is here to help.
        </p>

        <div className="contact-grid">
          {/* Contact Form */}
          <div className="contact-form">
            <h3>Send Us a Message</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                rows="4"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <button type="submit">📤 Send Message</button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="contact-info">
            <h3>Our Office</h3>
            <p>🏢 Avantika University, Ujjain, Madhya Pradesh</p>
            <p>📧 support@surakshasetu.in</p>
            <p>📞 +91 98765 43210</p>
            <p>🕓 Mon - Sat: 9:00 AM - 6:00 PM</p>

            <div className="map-container">
              <iframe
                title="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14644.634875109782!2d75.7857457!3d23.2243428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396374d2b0f31c0d%3A0x52789f4474b5a20c!2sAvantika%20University!5e0!3m2!1sen!2sin!4v1706189051820!5m2!1sen!2sin"
                width="100%"
                height="250"
                style={{ border: 0, borderRadius: "10px" }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
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

        /* ===== CONTACT SECTION ===== */
        .contact-container {
          max-width: 1000px;
          margin: 100px auto;
          padding: 20px;
          text-align: center;
        }

        .contact-container h2 {
          color: #203a43;
          margin-bottom: 10px;
        }

        .intro {
          color: #555;
          margin-bottom: 35px;
          font-size: 1rem;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
          align-items: start;
        }

        .contact-form, .contact-info {
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.1);
          text-align: left;
        }

        .contact-form h3,
        .contact-info h3 {
          color: #0f2027;
          margin-bottom: 15px;
        }

        .contact-form input,
        .contact-form textarea {
          width: 100%;
          margin-bottom: 15px;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 0.95rem;
        }

        .contact-form button {
          width: 100%;
          background: #203a43;
          color: white;
          border: none;
          padding: 12px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: background 0.3s;
        }

        .contact-form button:hover {
          background: #fca311;
          color: black;
        }

        .contact-info p {
          color: #444;
          margin-bottom: 10px;
        }

        .map-container {
          margin-top: 15px;
          border-radius: 10px;
          overflow: hidden;
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
