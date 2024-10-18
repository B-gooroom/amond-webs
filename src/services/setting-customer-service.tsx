import { supabase } from "@/utils/supabase/client";

export async function SettingCustomerService() {
  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .order("faq_id");

  console.log("data", data);

  if (error) {
    console.error("Error fetching faqs", error);
  } else {
    console.log("FAQs fetched successfully");
    return data;
  }
}
