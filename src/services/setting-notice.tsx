import { supabase } from "@/utils/supabase/client";

export async function SettingNotice() {
  const { data, error } = await supabase.from("announcements").select("*");

  if (error) {
    console.error("Error fetching notices", error);
  } else {
    console.log("Notices fetched successfully");
    return data;
  }
}
