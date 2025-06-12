import { writeFile, readFile } from "fs/promises";
import path from "path";

const logsPath = path.resolve(process.cwd(), "buildlogs.json");

export async function POST(req) {
  try {
    const { title, description, image, username, tags } = await req.json();

    if (!title || !description || !username) {
      return new Response("Missing fields", { status: 400 });
    }

    const newLog = {
      title,
      description,
      image,
      username,
      tags: tags?.split(",").map((t) => t.trim()),
      date: new Date().toISOString(),
    };

    let existing = [];

    try {
      const data = await readFile(logsPath, "utf-8");
      existing = JSON.parse(data);
    } catch (err) {
      // File doesn't exist yet — that’s fine
    }

    existing.push(newLog);

    await writeFile(logsPath, JSON.stringify(existing, null, 2), "utf-8");

    return new Response("Saved", { status: 200 });
  } catch (err) {
    console.error("❌ Error saving buildlog:", err);
    return new Response("Server error", { status: 500 });
  }
}
