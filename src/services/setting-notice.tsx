import { supabase } from "@/utils/supabase/client";

export async function SettingNotice() {
  const { data, error } = await supabase
    .from("announcements")
    .select("announcement_id, title, created_at")
    .eq("is_active", [true]);

  if (error) {
    console.error("Error fetching notices", error);
  } else {
    console.log("Notices fetched successfully");
    return data;
  }
}

export async function SettingNoticeDetail({
  announcement_id,
}: {
  announcement_id: number;
}) {
  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .eq("announcement_id", announcement_id);

  if (error) {
    console.error("Error fetching notice detail", error);
  } else {
    console.log("Notice detail fetched successfully");
    return data;
  }
}
