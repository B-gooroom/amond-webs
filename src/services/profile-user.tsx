import { SupabaseClient } from "@supabase/supabase-js";
// const { data: { user } } = await supabase.auth.getUser();

export async function profileUser(supabase: SupabaseClient) {
  const phonenum = "010-1234-5678";

  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("*")
    .in("phonenum", [phonenum])
    .single();

  if (userError) {
    console.error("Error fetching user:", userError.message);
    return [];
  }

  // console.log("userData", userData);

  return userData;
}
