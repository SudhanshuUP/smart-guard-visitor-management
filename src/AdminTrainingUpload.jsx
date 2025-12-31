import React, { useState } from "react";
import { supabase } from "./supabaseClient";

export default function AdminTrainingUpload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleUpload(e) {
    e.preventDefault();
    if (!videoFile) {
      alert("Please select a video file first!");
      return;
    }

    setLoading(true);

    try {
      // Upload to Supabase Storage
      const fileExt = videoFile.name.split(".").pop();
      const fileName = `${Date.now()}_${Math.random()
        .toString(36)
        .substring(2)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("training-videos")
        .upload(fileName, videoFile);

      if (uploadError) throw uploadError;

      // Get Public URL
      const { data } = supabase.storage
        .from("training-videos")
        .getPublicUrl(fileName);

      const videoUrl = data.publicUrl;

      // Insert into DB
      const { error: insertError } = await supabase
        .from("training_videos")
        .insert([
          {
            title,
            description,
            video_url: videoUrl,
            uploaded_by: "Admin",
          },
        ]);

      if (insertError) throw insertError;

      alert("🎥 Video uploaded successfully!");
      setTitle("");
      setDescription("");
      setVideoFile(null);
    } catch (err) {
      alert("Upload failed: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="upload-page">
      <h2>🎥 Upload Training Video</h2>
      <form onSubmit={handleUpload} className="upload-form">
        <input
          type="text"
          placeholder="Video Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideoFile(e.target.files[0])}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload Video"}
        </button>
      </form>

      <style>{`
        .upload-page {
          max-width: 600px;
          margin: 100px auto;
          background: #fff;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 5px 18px rgba(0,0,0,0.1);
          text-align: center;
          font-family: "Poppins", sans-serif;
        }
        h2 { color: #000; margin-bottom: 20px; }
        .upload-form {
          display: flex; flex-direction: column; gap: 15px;
        }
        input, textarea {
          padding: 12px; border: 1px solid #ccc; border-radius: 8px;
        }
        button {
          background: #000; color: white; padding: 12px; border: none;
          border-radius: 8px; cursor: pointer; font-weight: 600;
        }
        button:hover { background: #333; }
      `}</style>
    </div>
  );
}
