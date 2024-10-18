import { supabase } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  data: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 세션 정보를 가져옵니다.
    const getSession = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user:", error.message);
        setLoading(false);
        return;
      }

      if (data?.user) {
        setData(data.user); // 유저 데이터가 있으면 상태를 업데이트
      } else {
        setData(null); // 유저 데이터가 없으면 로그아웃 상태로 설정
      }
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        // console.log("event in AuthContext >>", _event);
        if (session) {
          setData(session.user); // 세션이 있으면 유저 데이터 업데이트
        }
        setLoading(false); // 로딩 상태 업데이트
      }
    );

    // 세션 상태가 변경될 때 감지합니다.
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ data, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Auth Context 훅을 사용하여 세션과 로딩 상태를 가져옵니다.
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
