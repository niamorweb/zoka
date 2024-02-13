import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import menuData from "./menuData";
import { MainNav } from "@/components/Layout/Header/main-nav";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabase";

const Header = () => {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkIsAuth = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (data.user) {
        setIsAuth(true);
      }
    };

    checkIsAuth();
  });

  return (
    <div className="flex h-20 items-center justify-between py-6">
      <MainNav items={menuData} />
      <nav>
        <Link
          href={isAuth ? "/dashboard/account" : "/signin"}
          className={cn(
            buttonVariants({ variant: "secondary", size: "sm" }),
            "px-4"
          )}
        >
          {isAuth ? "Dashboard" : "Login"}
        </Link>
      </nav>
    </div>
  );
};

export default Header;
