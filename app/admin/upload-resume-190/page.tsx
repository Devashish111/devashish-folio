"use client";

import { useState } from "react";

export default function AdminUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Select a PDF file");
      return;
    }

    const password = prompt("Enter admin password");
    if (!password) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const res = await fetch("https://pfolio-backend.onrender.com/admin/upload-resume", {
        method: "POST",
        headers: {
          "X-ADMIN-PASS": password,
        },
        body: formData,
      });

      if (res.ok) {
        alert("Resume uploaded successfully");

        // optional: refresh cache
        window.location.reload();
      } else {
        alert("Upload failed");
      }
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-2xl font-bold">Admin Resume Upload</h1>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="bg-black text-white px-4 py-2 rounded"
      >
        {loading ? "Uploading..." : "Upload Resume"}
      </button>
    </div>
  );
}