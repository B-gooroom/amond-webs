// supabaseClient.ts (클라이언트에서 사용할 클라이언트 설정)
import { createClient } from "@supabase/supabase-js";

// 환경 변수에서 URL과 키를 가져옵니다.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL! as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! as string;

// 클라이언트용 Supabase 인스턴스 생성
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
