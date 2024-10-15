// context/AuthContext.tsx
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
        return null;
      }

      if (data.user) {
        setData(data.user);
        setLoading(false);
      }
    };

    getSession();

    // // 세션 상태가 변경될 때 감지합니다.
    // const { data: authListener } = supabase.auth.onAuthStateChange(
    //   (_event, session) => {
    //     setData(data);
    //   }
    // );

    // return () => {
    //   authListener?.subscription.unsubscribe();
    // };
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
