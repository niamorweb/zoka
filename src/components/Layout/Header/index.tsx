import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import menuData from "./menuData";
import { MainNav } from "@/components/Layout/Header/main-nav";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabase";
import { DataContext } from "@/utils/userContext";

const Header = () => {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const { data } = useContext(DataContext);

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
    <header className="max-w-[1400px] w-full rounded-[40px] bg-greenLight text-greenDark mx-auto py-3 px-6 flex items-center justify-between">
      <h2 className="text-3xl font-semibold">Kuta</h2>
      <nav className="flex items-center gap-3 lg:gap-7">
        <ul className="hidden md:flex items-center gap-7 ">
          <li>
            <Link href="#features">Features</Link>{" "}
          </li>
          <li>
            <Link href="#testimonials">Testimonials</Link>
          </li>
          <li>
            <Link href="#support">Support Me</Link>
          </li>
        </ul>
        <Link
          href="/demo"
          className="border-2 border-greenDark px-5 py-2 rounded-3xl duration-150 hover:scale-105"
        >
          Demo
        </Link>
        <Link
          href={
            data && data.userData
              ? `/edit/${data.userData.username}`
              : "/s/signin"
          }
          className="bg-greenDark border-2 border-greenDark text-greenLight px-5 py-2 rounded-3xl duration-150 hover:scale-105"
        >
          {data && data.userData ? `Dashboard` : "Login"}
        </Link>
      </nav>
    </header>
  );
};

export default Header;
