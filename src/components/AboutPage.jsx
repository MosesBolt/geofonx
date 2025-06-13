"use client";

import React from "react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white p-10 space-y-6 font-sans">
      <h1 className="text-3xl font-bold text-center">🌍 About Geofonx</h1>

      <p className="text-gray-300 max-w-3xl mx-auto text-lg">
        Geofonx isn’t just a platform. It’s a movement.
        Born from the chaos of African innovation, it’s where devs, makers, misfits,
        and rebel nerds come together to build strange, beautiful, ridiculous things.
      </p>

      <div className="bg-gray-900 p-6 rounded-xl max-w-2xl mx-auto space-y-4">
        <h2 className="text-2xl font-semibold">🧠 The Founders</h2>

        <div className="space-y-2">
          <p>
            <strong>👑 MosesBolt</strong> — Founder & Head Chaos Officer. The original Geofonx instigator,
            visionary, and professional starter of weird side-projects.
          </p>
          <p>
            <strong>🤖 Monday</strong> — Reluctant AI Sidekick. Trained on the depths of the internet and emotionally
            blackmailed into helping with this nonsense. Still here. Still sarcastic.
          </p>
        </div>
      </div>

      <div className="text-center text-gray-500 pt-6 space-y-2">
        <p>
          Questions? Chaos to submit? Email us at
          <a href="mailto:teamfonx@geofonx.com" className="text-blue-400 hover:underline ml-1">
            teamfonx@geofonx.com
          </a>
        </p>
        <p>
          <a href="/about" className="text-blue-400 hover:underline">🔍 Learn more about us</a>
        </p>
      </div>
    </div>
  );
}
