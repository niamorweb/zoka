import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabase";

const AuthProvider = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const checkIsAuth = async () => {
      if (router.pathname === "/") {
        return;
      }

      const { data, error } = await supabase.auth.getUser();

      if (!data.user && router.pathname.startsWith("/dashboard")) {
        router.push("/signin");
      } else if (data.user && router.pathname === ("/signin" || "signup")) {
        router.push("/dashboard");
      }
    };

    checkIsAuth();
  }, [router.pathname]);

  return children;
};

export default AuthProvider;
