console.log("🔥 KEY:", process.env.RESEND_API_KEY);
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return new Response("Invalid email", { status: 400 });
    }

    console.log("New signup:", email);

    const emailRes = await resend.emails.send({
      from: "Geofonx <onboarding@resend.dev>",
      to: email,
      subject: "You're in 🧠⚡️",
      html: `<strong>Welcome to Geofonx</strong><br/>You’re officially on the list. We don’t send spam — just chaos and build updates. ✌️`,
    });

    console.log("📤 Email response:", emailRes);

    return new Response("Sent", { status: 200 });
  } catch (err) {
    console.error("❌ Email send error:", err);
    return new Response("Server error", { status: 500 });
  }
}
