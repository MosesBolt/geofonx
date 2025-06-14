"use client";
import React, { useState, useEffect } from "react";

export default function ChaosFeedPage({ user }) {
  const [feed, setFeed] = useState([]);
  const [inputs, setInputs] = useState({ title: "", description: "", emoji: "", video_url: "" });
  const [commentInputs, setCommentInputs] = useState({});

  const fetchFeed = async () => {
    const res = await fetch("/api/chaosfeed");
    const data = await res.json();
    setFeed(data);
  };

  const submitPost = async () => {
    if (!inputs.title || !inputs.emoji) return;
    if (!user) return alert("You must be logged in.");

    await fetch("/api/chaosfeed", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...inputs,
        user_id: user.id,
        user_email: user.email
      }),
    });

    setInputs({ title: "", description: "", emoji: "", video_url: "" });
    fetchFeed();
  };

  const submitComment = async (index) => {
    const comment = commentInputs[index];
    if (!comment) return;
    await fetch("/api/chaosfeed", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment, commentIndex: index }),
    });
    setCommentInputs({ ...commentInputs, [index]: "" });
    fetchFeed();
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8 space-y-6 font-sans">
      {/* CHAOS FORM */}
      <div className="space-y-4">
        <input placeholder="Emoji" value={inputs.emoji} onChange={(e) => setInputs({ ...inputs, emoji: e.target.value })} className="w-full px-4 py-2 rounded bg-gray-800" />
        <input placeholder="Title" value={inputs.title} onChange={(e) => setInputs({ ...inputs, title: e.target.value })} className="w-full px-4 py-2 rounded bg-gray-800" />
        <textarea placeholder="Description" value={inputs.description} onChange={(e) => setInputs({ ...inputs, description: e.target.value })} className="w-full p-4 rounded bg-gray-800" />
        <input placeholder="Video URL" value={inputs.video_url} onChange={(e) => setInputs({ ...inputs, video_url: e.target.value })} className="w-full px-4 py-2 rounded bg-gray-800" />
        <button onClick={submitPost} className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded text-white font-bold">Inject Chaos</button>
      </div>

      {/* CHAOS FEED */}
      <ul className="space-y-6">
        {feed.map((post, idx) => (
          <li key={post.id} className="bg-gray-900 p-4 rounded space-y-2">
            <div className="text-2xl">{post.emoji} {post.title}</div>
            {post.description && <p>{post.description}</p>}
            {post.user_email && <p className="text-xs text-gray-500">By {post.user_email}</p>}
            {post.video_url && (
              post.video_url.includes("youtube") ? (
                <iframe src={post.video_url.replace("watch?v=", "embed/")} className="w-full aspect-video rounded" />
              ) : (
                <video controls src={post.video_url} className="w-full rounded" />
              )
            )}
            {(post.comments || []).map((c,i) => (
              <div key={i} className="bg-gray-800 p-2 rounded">
                <p>{c.content}</p>
                <p className="text-xs text-gray-500">{new Date(c.date).toLocaleString()}</p>
              </div>
            ))}
            <div className="flex space-x-2">
              <input placeholder="Your comment" value={commentInputs[idx]||""} onChange={(e) => setCommentInputs({ ...commentInputs, [idx]: e.target.value })} className="flex-1 px-3 py-2 rounded bg-gray-800" />
              <button onClick={() => submitComment(idx)} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">Send</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
