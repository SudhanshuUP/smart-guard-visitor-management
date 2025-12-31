import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function GuardTrainingVideos() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  async function fetchVideos() {
    const { data, error } = await supabase
      .from("training_videos")
      .select("*")
      .order("uploaded_at", { ascending: false });

    if (error) {
      console.error("Error fetching videos:", error.message);
    } else {
      setVideos(data);
    }
  }

  return (
    <div className="videos-page">
      <h2>🎬 Training Videos</h2>
      <p>Watch the latest security training materials below.</p>

      {videos.length === 0 ? (
        <p className="no-data">No videos uploaded yet.</p>
      ) : (
        <div className="video-grid">
          {videos.map((v) => (
            <div key={v.id} className="video-card">
              <video width="100%" height="auto" controls>
                <source src={v.video_url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <h4>{v.title}</h4>
              <p>{v.description}</p>
              <small>📅 {new Date(v.uploaded_at).toLocaleString()}</small>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .videos-page {
          max-width: 1100px;
          margin: 100px auto;
          background: #fff;
          padding: 40px 50px;
          border-radius: 16px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.1);
          text-align: center;
          font-family: "Poppins", sans-serif;
        }

        h2 { color: #000; font-weight: 700; }
        p { color: #444; margin-bottom: 25px; }
        .no-data { color: #777; font-style: italic; }

        .video-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 25px;
        }

        .video-card {
          background: #f9fafc;
          padding: 20px;
          border-radius: 12px;
          border: 1px solid #ddd;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
          text-align: left;
        }

        .video-card h4 { margin-top: 10px; color: #000; }
        .video-card p { color: #333; }
        .video-card small { color: #666; }
      `}</style>
    </div>
  );
}
