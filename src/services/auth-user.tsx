import { supabase } from "@/utils/supabase/client";

export async function AuthUser() {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error("Error fetching user:", error.message);
    return null;
  }
  return data;
}
