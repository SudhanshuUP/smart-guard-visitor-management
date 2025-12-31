import { useState } from "react";
import { supabase } from "./supabaseClient";
import guardImage from "./assets/8468bda6-9602-4952-b7db-d91178b2ecbc.jpg"; // 👈 Use your image path

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("guard");
  const [phone, setPhone] = useState("");
  const [qualification, setQualification] = useState("");
  const [inviteCode, setInviteCode] = useState("");

  const VALID_CODES = {
    admin: "ADMIN-ACCESS-2025",
    guard: "GUARD-ENTRY-2025",
  };

  async function handleSignup(e) {
    e.preventDefault();

    if (inviteCode !== VALID_CODES[role]) {
      alert("❌ Invalid invite code. Contact admin for access.");
      return;
    }

    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return alert(error.message);

    const { user } = data;
    if (!user) return alert("Signup failed. Try again.");

    const { error: insertError } = await supabase.from("profiles").insert([
      {
        id: user.id,
        full_name: fullName,
        role,
        phone,
        qualification,
        created_at: new Date(),
      },
    ]);

    if (insertError) return alert("Database error: " + insertError.message);
    alert("✅ Signup successful! You can now log in.");
  }

  return (
    <>
      <div className="signup-wrapper">
        {/* ===== LEFT SIDE IMAGE ===== */}
        <div className="left-panel">
          <img src={guardImage} alt="Security Guard" />
        </div>

        {/* ===== RIGHT SIDE FORM ===== */}
        <div className="right-panel">
          <h2>SurakshaSetu</h2>
          <p className="subtitle">Your secure access portal for guards & admins</p>

          <form onSubmit={handleSignup} className="signup-form">
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
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
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="guard">Guard</option>
              <option value="admin">Admin</option>
            </select>
            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="text"
              placeholder="Qualification (e.g., Diploma in Security)"
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter Invite Code"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              required
            />

            <button type="submit" className="create-btn">Create Account</button>
            <a href="/login" className="signin-btn">Sign In</a>
          </form>
        </div>
      </div>

      {/* ===== INLINE CSS ===== */}
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
        }

        body {
          background: #f8f9fa;
          color: #111;
        }

        .signup-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          width: 100%;
          overflow: hidden;
          background: #ffffff;
        }

        /* === LEFT SIDE === */
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

        /* === RIGHT SIDE === */
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

        .signup-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .signup-form input,
        .signup-form select {
          padding: 0.9rem 1rem;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 1rem;
          background: #fafafa;
          color: #000;
          transition: all 0.3s ease;
        }

        .signup-form input:focus,
        .signup-form select:focus {
          outline: none;
          border-color: #111;
          box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
          background: #fff;
        }

        .create-btn {
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

        .create-btn:hover {
          background: #222;
          transform: translateY(-2px);
        }

        .signin-btn {
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

        .signin-btn:hover {
          background: #000;
          color: #fff;
        }

        /* === RESPONSIVE === */
        @media (max-width: 950px) {
          .signup-wrapper {
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
