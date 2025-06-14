import { supabase } from "../../../lib/supabaseClient";

export async function GET() {
  const { data, error } = await supabase
    .from("buildlogs")
    .select("*")
    .order("date", { ascending: false });

  return new Response(JSON.stringify(data || []), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req) {
  const { title, description, image, username, tags } = await req.json();

  if (!title || !description || !username) {
    return new Response("Missing fields", { status: 400 });
  }

  await supabase.from("buildlogs").insert({
    title,
    description,
    image_url: image,
    username,
    tags: tags?.split(",").map((tag) => tag.trim()),
  });

  return new Response("Saved", { status: 200 });
}
