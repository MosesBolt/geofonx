"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function BuildFeed() {
  const [logs, setLogs] = useState([]);

  const fetchFeed = async () => {
    const { data } = await supabase
      .from("buildlogs")
      .select("*")
      .order("date", { ascending: false });

    setLogs(data || []);
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8 space-y-6 font-sans">
      <h1 className="text-3xl font-bold mb-4">🧪 Community Build Logs</h1>
      {logs.length === 0 ? (
        <p className="text-gray-400">No builds yet. Be the first to drop chaos.</p>
      ) : (
        <ul className="space-y-4">
          {logs.map((log) => (
            <li key={log.id} className="bg-gray-900 p-4 rounded-xl border border-gray-700">
              <h2 className="text-xl font-semibold">{log.title}</h2>
              <p className="text-gray-300">{log.description}</p>
              {log.image_url && (
                <img
                  src={log.image_url}
                  alt="screenshot"
                  className="mt-2 rounded-md max-h-64 border border-gray-700"
                />
              )}
              <p className="text-sm text-gray-500 mt-2">
                By {log.username} | {new Date(log.date).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
