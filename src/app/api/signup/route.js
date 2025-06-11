import { appendFile } from "fs/promises";
import path from "path";

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return new Response(JSON.stringify({ message: "Invalid email." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const filePath = path.join(process.cwd(), "emails.txt");
    const entry = `${email}\n`;

    await appendFile(filePath, entry, "utf8");

    return new Response(JSON.stringify({ message: "You're on the list!" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error saving email:", err);
    return new Response(
      JSON.stringify({ message: "Server error. Try again later." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
