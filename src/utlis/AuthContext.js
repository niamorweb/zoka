import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabase";

const AuthProvider = ({ children }) => {
  const router = useRouter();

  // useEffect(() => {
  //   const checkIsAuth = async () => {
  //     if (router.pathname === "/") {
  //       return;
  //     }

  //     const { data: userData, error } = await supabase.auth.getUser();

  //     if (!userData.user && router.pathname.startsWith("/dashboard/account")) {
  //       router.push("/s/signin");
  //     } else if (userData.user && router.pathname === ("/s/signin" || "/s/signup")) {
  //       router.push(`/${data.userData.username}`);
  //     }
  //   };

  //   checkIsAuth();
  // }, [router.pathname]);

  return children;
};

export default AuthProvider;
