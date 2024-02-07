import { supabase } from "@/lib/supabase";

export default function requireAuthMiddleware(handler: any) {
  return async () => {
    const user = supabase.auth.getUser();

    if (!user) {
      window.location.href = "/login";
      return;
    }

    return handler();
  };
}
