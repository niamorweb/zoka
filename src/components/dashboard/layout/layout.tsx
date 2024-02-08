import Image from "next/image";

import { SidebarNav } from "../nav/sidebar-nav";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MobileNav } from "../nav/mobile-nav";
import { Separator } from "@/components/ui/separator";
import { ToastProvider } from "@/components/ui/toast";
import Link from "next/link";

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/dashboard",
    category: "profile",
  },
  {
    title: "Account",
    href: "/dashboard/account",
    category: "account",
  },
  {
    title: "Gallery",
    href: "/dashboard/gallery",
    category: "profile",
  },
  {
    title: "Appearance",
    href: "/dashboard/appearence",
    category: "profile",
  },
  {
    title: "Notifications",
    href: "/dashboard/notifications",
    category: "account",
  },
  {
    title: "View my page",
    href: "/dashboard/",
    category: "profile",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: SettingsLayoutProps) {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkIsAuth = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (data.user) {
        setIsAuth(true);
      } else {
        router.push("/signin");
      }
    };

    checkIsAuth();
  });

  return (
    <ToastProvider>
      {isAuth && (
        <>
          <div className="space-y-6 p-10 pb-16 md:block">
            <div className="space-y-0.5">
              <Link href="/" className="text-2xl font-bold tracking-tight">
                ZOKA
              </Link>
              <p className="text-muted-foreground">
                Manage your profile to show your best photos
              </p>
            </div>
            <div className="lg:hidden">
              <MobileNav items={sidebarNavItems} />
            </div>
            <Separator className="my-6" />
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
              <aside className="hidden lg:flex -mx-4 lg:w-1/5">
                <SidebarNav items={sidebarNavItems} />
              </aside>
              <div className="flex-1 lg:max-w-2xl">{children}</div>
            </div>
          </div>
        </>
      )}
    </ToastProvider>
  );
}
