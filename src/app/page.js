"use client";
import React from "react";
import { motion } from "framer-motion";
import BuildFeed from "@/components/BuildFeed";

export default function GeofonxLanding() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-black text-white min-h-screen font-sans p-8"
    >
      <div className="max-w-3xl mx-auto space-y-10">
        <header className="text-center">
          <h1 className="text-4xl font-bold">Geofonx</h1>
          <p className="text-xl mt-2 text-gray-400">
            Africa’s Tech Misfits, United by Chaos and Code
          </p>
        </header>
<a href="/chaos" className="text-blue-400 hover:underline text-sm">
  🔥 Visit the Chaos Feed
</a>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            We’re not building a social network. We’re building a resistance.
          </h2>
          <p className="text-gray-300">
            Geofonx is a digital hangout for developers, science geeks, indie
            makers, and tech rebels across Africa. We solve real problems. We
            share weird builds. We don’t wait for permission.
          </p>
          <p className="text-gray-300">
            You bring the brains. We bring the squad.
          </p>
        </section>

        <section className="space-y-6 mt-16">
          <h2 className="text-2xl font-semibold">🧪 Recent Builds from the Community</h2>
          <BuildFeed />
          <div className="text-right">
            <a href="/buildlogs" className="text-blue-400 hover:underline text-sm">
              View all build logs →
            </a>
          </div>
        </section>

        <section className="mt-16">
          <h3 className="text-xl font-semibold mb-4 text-center">🔧 Submit Your Build</h3>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const res = await fetch("/api/buildlog", {
                method: "POST",
                body: JSON.stringify({
                  title: formData.get("title"),
                  description: formData.get("description"),
                  image: formData.get("image"),
                  username: formData.get("username"),
                  tags: formData.get("tags"),
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              });

              if (res.ok) {
                alert("Build submitted. Chaos logged.");
                e.target.reset();
              } else {
                alert("Error submitting build. Try again.");
              }
            }}
            className="space-y-4 max-w-xl mx-auto"
          >
            <input
              type="text"
              name="title"
              placeholder="Build Title"
              required
              className="w-full px-4 py-2 rounded bg-gray-800 text-white"
            />
            <input
              type="text"
              name="description"
              placeholder="What does it do?"
              required
              className="w-full px-4 py-2 rounded bg-gray-800 text-white"
            />
            <input
              type="text"
              name="image"
              placeholder="Optional image URL"
              className="w-full px-4 py-2 rounded bg-gray-800 text-white"
            />
            <input
              type="text"
              name="username"
              placeholder="Your name or alias"
              required
              className="w-full px-4 py-2 rounded bg-gray-800 text-white"
            />
            <input
              type="text"
              name="tags"
              placeholder="Comma-separated tags (e.g., AI, IoT, meme)"
              className="w-full px-4 py-2 rounded bg-gray-800 text-white"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded text-white font-bold"
            >
              Submit Build
            </button>
          </form>
        </section>
<section className="text-center space-y-4 mt-16">
  <p className="text-xl font-semibold">👇 Ready to Build Something Real?</p>
  <form
    onSubmit={async (e) => {
      e.preventDefault();
      const email = e.target.email.value;
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        alert("You're on the list. We’ll email you updates.");
        e.target.reset();
      } else {
        alert("Something went wrong. Try again later.");
      }
    }}
    className="flex flex-col items-center space-y-4"
  >
    <input
      type="email"
      name="email"
      placeholder="you@example.com"
      required
      className="text-black px-4 py-2 rounded-md w-64"
    />
    <button
      type="submit"
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-xl"
    >
      Get Early Access
    </button>
  </form>
</section>

        <footer className="text-center text-gray-500 mt-10">
          <p>Follow us @geofonx. Or don’t. But you’ll miss out, and we’ll laugh behind your back.</p>
          <p className="text-xs text-gray-600 mt-2">Built in Lagos. Deployed from a generator.</p>
       <p className="text-sm text-gray-500 mt-4">
  📬 Contact us at <a href="mailto:teamfonx@geofonx.com" className="underline text-blue-400">teamfonx@geofonx.com</a>
</p>
<p className="text-sm text-gray-500">
  Learn more <a href="/about" className="underline text-blue-400">About Geofonx</a>
</p>
 </footer>
      </div>
    </motion.div>
  );
}
