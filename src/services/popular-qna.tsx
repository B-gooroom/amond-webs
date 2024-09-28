import { SupabaseClient } from "@supabase/supabase-js";

export async function popularQna(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from("qna")
    .select("*")
    .eq("is_popular", true)
    .order("created_at", { ascending: false })
    .limit(3);

  if (error) {
    console.error("Error fetching popular QnA:", error.message);
    return [];
  }

  return data;
}
