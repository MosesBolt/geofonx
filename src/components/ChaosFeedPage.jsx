"use client";

import React, { useEffect, useState } from "react";

export default function ChaosFeedPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [emoji, setEmoji] = useState("🧪");
  const [video, setVideo] = useState("");
  const [feed, setFeed] = useState([]);
  const [commentInputs, setCommentInputs] = useState({});

  const fetchFeed = async () => {
    const res = await fetch("/api/chaosfeed");
    const data = await res.json();
    setFeed(data);
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  const submitChaos = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/chaosfeed", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, emoji, video }),
    });

    if (res.ok) {
      setTitle("");
      setDescription("");
      setEmoji("🧪");
      setVideo("");
      fetchFeed();
    } else {
      alert("Failed to post chaos.");
    }
  };

  const submitComment = async (index) => {
    const comment = commentInputs[index];
    if (!comment) return;

    const res = await fetch("/api/chaosfeed", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment, commentIndex: index }),
    });

    if (res.ok) {
      setCommentInputs({ ...commentInputs, [index]: "" });
      fetchFeed();
    } else {
      alert("Failed to save comment.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 space-y-8">
      <h1 className="text-3xl font-bold text-center">⚡ Geofonx Chaos Feed</h1>

      <form
        onSubmit={submitChaos}
        className="bg-gray-900 p-4 rounded-xl space-y-3 max-w-xl mx-auto"
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Chaos headline (e.g., AI made my code worse)"
          className="w-full px-4 py-2 rounded bg-gray-700 text-white"
          required
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="(optional) What happened?"
          className="w-full px-4 py-2 rounded bg-gray-700 text-white"
        />
        <input
          value={video}
          onChange={(e) => setVideo(e.target.value)}
          placeholder="(optional) Paste video URL (.mp4, YouTube embed, etc)"
          className="w-full px-4 py-2 rounded bg-gray-700 text-white"
        />
        <input
          value={emoji}
          onChange={(e) => setEmoji(e.target.value)}
          placeholder="Emoji (e.g. 🔥, 🧪, 🪫)"
          className="w-full px-4 py-2 rounded bg-gray-700 text-white"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded text-white font-bold"
        >
          Inject Chaos
        </button>
      </form>

      <div className="space-y-4 max-w-2xl mx-auto">
        {feed.length === 0 && <p className="text-gray-400 text-center">No chaos yet.</p>}
        {feed.map((item, i) => (
          <div key={i} className="bg-gray-800 p-4 rounded-xl">
            <p className="text-2xl">{item.emoji}</p>
            <h2 className="text-xl font-bold">{item.title}</h2>
            {item.description && <p className="text-gray-300">{item.description}</p>}
            {item.video && (
              <div className="mt-2">
                {item.video.includes("youtube") ? (
                  <iframe
                    src={item.video}
                    title="chaos video"
                    className="w-full aspect-video rounded"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <video
                    src={item.video}
                    controls
                    className="w-full rounded"
                  />
                )}
              </div>
            )}
            <p className="text-sm text-gray-500 mt-2">
              {new Date(item.date).toLocaleString()}
            </p>
            <div className="mt-4 space-y-2">
              <h3 className="font-semibold">💬 Comments</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                {(item.comments || []).map((c, j) => (
                  <li key={j} className="bg-gray-700 p-2 rounded">{c}</li>
                ))}
              </ul>
              <div className="flex space-x-2 mt-2">
                <input
                  value={commentInputs[i] || ""}
                  onChange={(e) => setCommentInputs({ ...commentInputs, [i]: e.target.value })}
                  placeholder="Add a comment"
                  className="w-full px-4 py-2 rounded bg-gray-700 text-white"
                />
                <button
                  onClick={() => submitComment(i)}
                  className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white font-bold"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
