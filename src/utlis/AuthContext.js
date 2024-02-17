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

      if (!data.user && router.pathname.startsWith("/dashboard/account")) {
        router.push("/s/signin");
      } else if (data.user && router.pathname === ("/s/signin" || "signup")) {
        router.push("/dashboard/account");
      }
    };

    checkIsAuth();
  }, [router.pathname]);

  return children;
};

export default AuthProvider;
