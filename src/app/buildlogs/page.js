import { readFile } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

export default async function BuildsPage() {
  const filePath = path.resolve(process.cwd(), "buildlogs.json");
  let logs = [];

  try {
    const data = await readFile(filePath, "utf-8");
    logs = JSON.parse(data);
  } catch (err) {
    console.log("No logs found yet.");
  }

  return (
    <div className="min-h-screen bg-black text-white p-8 space-y-6">
      <h1 className="text-3xl font-bold mb-4">🧪 Community Build Logs</h1>

      {logs.length === 0 ? (
        <p className="text-gray-400">No builds yet. Be the first to drop chaos.</p>
      ) : (
        <ul className="space-y-4">
          {logs.reverse().map((log, i) => (
            <li
              key={i}
              className="bg-gray-900 p-4 rounded-xl border border-gray-700"
            >
              <h2 className="text-xl font-semibold">{log.title}</h2>
              <p className="text-gray-300">{log.description}</p>
              {log.image && (
                <img
                  src={log.image}
                  alt="screenshot"
                  className="mt-2 rounded-md max-h-64 border border-gray-700"
                />
              )}
              <p className="text-sm text-gray-500 mt-2">
                Submitted: {new Date(log.date).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
