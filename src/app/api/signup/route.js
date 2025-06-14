import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const formData = await req.formData();
  const email = formData.get("email");

  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Welcome to Geofonx",
      html: `<p>You're officially on the chaos list. Expect builds. Expect noise.</p>`,
    });

    console.log("New sign up:", email);
    console.log("Resend response:", data);

    const redirectURL = new URL("/", req.url);
    return NextResponse.redirect(redirectURL, { status: 303 });

  } catch (err) {
    console.error("Email error:", err);
    return NextResponse.json(
      {
        error: err?.message || "Unknown error",
        details: err,
      },
      { status: 500 }
    );
  }
}
