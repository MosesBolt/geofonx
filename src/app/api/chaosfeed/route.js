import { writeFile, readFile } from "fs/promises";
import path from "path";

const chaosPath = path.resolve(process.cwd(), "chaosfeed.json");

export async function POST(req) {
  try {
    const { title, description, emoji, comment, commentIndex } = await req.json();

    let existing = [];
    try {
      const data = await readFile(chaosPath, "utf-8");
      existing = JSON.parse(data);
    } catch (err) {
      // file not found? empty feed.
    }

    if (comment && typeof commentIndex === "number") {
      existing[commentIndex].comments = existing[commentIndex].comments || [];
      existing[commentIndex].comments.push(comment);
    } else if (title && emoji) {
      const post = {
        title,
        description,
        emoji,
        date: new Date().toISOString(),
        comments: [],
      };
      existing.unshift(post);
    } else {
      return new Response("Missing fields", { status: 400 });
    }

    await writeFile(chaosPath, JSON.stringify(existing, null, 2), "utf-8");
    return new Response("Saved", { status: 200 });
  } catch (err) {
    console.error("Chaos feed error:", err);
    return new Response("Server error", { status: 500 });
  }
}

export async function GET() {
  try {
    const data = await readFile(chaosPath, "utf-8");
    const posts = JSON.parse(data);
    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}
