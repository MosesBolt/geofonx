"use client";
import React, { useEffect, useState } from "react";

export default function BuildFeed() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const res = await fetch("/buildlogs.json");
      if (res.ok) {
        const data = await res.json();
        setLogs(data.reverse().slice(0, 3)); // Show 3 most recent
      }
    };
    fetchLogs();
  }, []);

  if (!logs.length) return <p className="text-gray-400">No builds submitted yet.</p>;

  return (
    <ul className="space-y-4">
      {logs.map((log, i) => (
        <li key={i} className="bg-gray-900 p-4 rounded-xl border border-gray-700">
          <h3 className="text-xl font-semibold">{log.title}</h3>
          <p className="text-gray-300">{log.description}</p>
          <p className="text-sm text-gray-500 mt-1">By {log.username || "Unknown"}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {log.tags?.map((tag, i) => (
              <span key={i} className="bg-blue-700 px-2 py-1 text-xs rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}
