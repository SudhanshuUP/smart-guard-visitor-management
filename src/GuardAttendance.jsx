import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function GuardAttendance() {
  const [attendance, setAttendance] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserAndData();
  }, []);

  async function getUserAndData() {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user) {
      alert("Please log in first!");
      window.location.href = "/login";
      return;
    }
    setUser(userData.user);
    fetchAttendance(userData.user.email);
  }

  async function fetchAttendance(email) {
    const username = email.split("@")[0];
    const { data, error } = await supabase
      .from("attendance")
      .select("*")
      .ilike("guard_name", `%${username}%`)
      .order("date", { ascending: false });

    if (error) alert(error.message);
    else setAttendance(data);
  }

  return (
    <div className="attendance-view">
      <h2>📅 My Attendance</h2>
      {attendance.length === 0 ? (
        <p>No attendance records found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
              <th>Marked By</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((a) => (
              <tr key={a.id}>
                <td>{a.date}</td>
                <td
                  style={{
                    color: a.status === "Present" ? "green" : "red",
                    fontWeight: 600,
                  }}
                >
                  {a.status}
                </td>
                <td>{a.marked_by}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <style>{`
        .attendance-view {
          max-width: 700px;
          margin: 80px auto;
          background: #fff;
          border-radius: 12px;
          padding: 40px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.1);
          text-align: center;
          font-family: 'Poppins', sans-serif;
        }
        h2 { color: #000; margin-bottom: 20px; }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 12px;
          text-align: center;
        }
        th {
          background: #1d3557;
          color: white;
        }
      `}</style>
    </div>
  );
}
