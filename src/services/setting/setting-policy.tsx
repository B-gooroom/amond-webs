import { supabase } from "@/utils/supabase/client";

export async function TermsOfServiceData() {
  const { data: termsData, error: termsError } = await supabase
    .from("terms_of_service")
    .select("*")
    .eq("version", ["1.0"])
    .order("terms_id", { ascending: true });

  if (termsError) {
    console.error("Error fetching terms-of-service:", termsError.message);
  }

  return termsData;
}
