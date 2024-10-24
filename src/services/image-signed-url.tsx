import { supabase } from "@/utils/supabase/client";

export async function ImageSignedUrl(path: string) {
  // console.log("path", path);
  const pathName = path.replace(
    "https://xtlpqspaohusobjcvsas.supabase.co/storage/v1/object/sign/test_bucket/",
    // "public/"
    ""
  );

  const { data, error } = await supabase.storage
    .from("test_bucket") // 버킷 이름
    .createSignedUrl(pathName, 60 * 60); // 1시간 동안 유효한 서명된 URL

  if (error) {
    console.error("Error creating signed URL:", error);
    return null;
  }

  return data.signedUrl;
}
