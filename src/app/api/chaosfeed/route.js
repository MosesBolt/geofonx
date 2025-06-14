import { supabase } from "../../../lib/supabaseClient";

export async function GET() {
  const { data } = await supabase
    .from("chaosfeed")
    .select("*, comments(*)")
    .order("date", { ascending: false });
  return new Response(JSON.stringify(data || []), { status:200, headers:{ "Content-Type":"application/json" }});
}

export async function POST(req) {
  const { title, description, emoji, video_url, comment, commentIndex, user_id, user_email } = await req.json();

  if (comment !== undefined && typeof commentIndex === "number") {
    const posts = await supabase.from("chaosfeed").select("id").order("date", { ascending: false });
    const post = posts.data?.[commentIndex];
    if (!post) return new Response("Invalid index", { status:400 });
    await supabase.from("comments").insert({ chaos_id: post.id, content: comment });
    return new Response("Saved", { status:200 });
  }

  if (!title || !emoji || !user_id) {
    return new Response("Missing fields", { status:400 });
  }

  await supabase.from("chaosfeed").insert({ title, description, emoji, video_url, user_id, user_email });
  return new Response("Saved", { status:200 });
}
