import { useState } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";
import guardImage from "./assets/8468bda6-9602-4952-b7db-d91178b2ecbc.jpg"; // 👈 same image you used in Signup

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Login error: " + error.message);
      return;
    }

    if (!data?.user) {
      alert("Login succeeded but no user returned.");
      return;
    }

    const { data: profile, error: pErr } = await supabase
      .from("profiles")
      .select("role, full_name")
      .eq("id", data.user.id)
      .single();

    if (pErr || !profile) {
      console.error("Profile fetch error:", pErr);
      alert("No profile found. Please contact admin or re-signup.");
      return;
    }

    // Redirect based on role
    if (profile.role === "admin") {
      nav("/admin");
    } else {
      nav("/guard");
    }
  }

  return (
    <>
      <div className="login-wrapper">
        {/* ===== LEFT SIDE IMAGE ===== */}
        <div className="left-panel">
          <img src={guardImage} alt="Security Guard" />
        </div>

        {/* ===== RIGHT SIDE FORM ===== */}
        <div className="right-panel">
          <h2>Welcome Back 👋</h2>
          <p className="subtitle">Login securely to access your SurakshaSetu portal</p>

          <form onSubmit={handleLogin} className="login-form">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="login-btn">
              Login
            </button>
            <a href="/signup" className="signup-btn">
              Create Account
            </a>
          </form>
        </div>
      </div>

      {/* ===== INLINE STYLES ===== */}
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: "Poppins", sans-serif;
        }

        body {
          background: #f8f9fa;
          color: #111;
        }

        .login-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          width: 100%;
          overflow: hidden;
          background: #ffffff;
        }

        /* === LEFT PANEL === */
        .left-panel {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #f2f2f2;
          padding: 2rem;
        }

        .left-panel img {
          width: 80%;
          max-width: 450px;
          border-radius: 12px;
          object-fit: cover;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
        }

        /* === RIGHT PANEL === */
        .right-panel {
          flex: 1;
          background: #fff;
          color: #111;
          padding: 3rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: left;
        }

        .right-panel h2 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: #000;
        }

        .subtitle {
          font-size: 1rem;
          color: #333;
          opacity: 0.8;
          margin-bottom: 2rem;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .login-form input {
          padding: 0.9rem 1rem;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 1rem;
          background: #fafafa;
          color: #000;
          transition: all 0.3s ease;
        }

        .login-form input:focus {
          outline: none;
          border-color: #111;
          box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
          background: #fff;
        }

        .login-btn {
          background: #000;
          color: #fff;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          padding: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1rem;
          letter-spacing: 0.5px;
        }

        .login-btn:hover {
          background: #222;
          transform: translateY(-2px);
        }

        .signup-btn {
          background: transparent;
          color: #111;
          border: 1px solid #111;
          text-align: center;
          border-radius: 8px;
          padding: 0.9rem;
          font-weight: 600;
          margin-top: 0.5rem;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .signup-btn:hover {
          background: #000;
          color: #fff;
        }

        /* === RESPONSIVE === */
        @media (max-width: 950px) {
          .login-wrapper {
            flex-direction: column;
            min-height: 100vh;
          }

          .left-panel {
            width: 100%;
            padding: 1.5rem;
          }

          .left-panel img {
            width: 100%;
            max-width: 350px;
          }

          .right-panel {
            width: 100%;
            text-align: center;
            padding: 2rem;
          }

          .right-panel h2 {
            text-align: center;
          }

          .subtitle {
            text-align: center;
          }
        }
      `}</style>
    </>
  );
}
