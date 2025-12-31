import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function AdminIncidentView() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIncidents();
  }, []);

  async function fetchIncidents() {
    const { data, error } = await supabase
      .from("incidents")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading incidents:", error);
      alert("Error loading incidents: " + error.message);
    } else {
      setIncidents(data);
    }
    setLoading(false);
  }

  return (
    <div className="incident-container">
      <h2>🚨 Incident Reports (Admin View)</h2>

      {loading ? (
        <p>Loading incidents...</p>
      ) : incidents.length === 0 ? (
        <p>No incidents reported yet.</p>
      ) : (
        <ul className="incident-list">
          {incidents.map((i) => (
            <li key={i.id}>
              <h3>👮 {i.guard_name}</h3>
              <p>{i.description}</p>
              {i.photo_url ? (
                <img src={i.photo_url} alt="Incident" className="incident-img" />
              ) : (
                <p style={{ color: "#777", fontStyle: "italic" }}>
                  No photo attached
                </p>
              )}
              <p className="time">
                🕒 {new Date(i.created_at).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}

      <style>{`
        .incident-container {
          max-width: 1000px;
          margin: 80px auto;
          background: #fff;
          padding: 50px;
          border-radius: 16px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
          font-family: 'Poppins', sans-serif;
        }
        h2 {
          text-align: center;
          color: #000;
          margin-bottom: 30px;
        }
        .incident-list {
          list-style: none;
          padding: 0;
        }
        .incident-list li {
          background: #f9f9f9;
          padding: 20px;
          margin-bottom: 20px;
          border-radius: 10px;
          border: 1px solid #ddd;
        }
        h3 {
          margin-bottom: 5px;
          color: #000;
        }
        .incident-img {
          width: 100%;
          max-width: 500px;
          border-radius: 10px;
          margin-top: 10px;
          object-fit: cover;
          display: block;
        }
        .time {
          color: #555;
          font-size: 0.9rem;
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
}
