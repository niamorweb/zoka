import Image from "next/image";

import { SidebarNav } from "../nav/sidebar-nav";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MobileNav } from "../nav/mobile-nav";
import { Separator } from "@/components/ui/separator";
import { ToastProvider } from "@/components/ui/toast";
import Link from "next/link";
import { DataContext } from "@/utlis/userContext";
import * as React from "react";
import { Button } from "@/components/ui/button";

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: SettingsLayoutProps) {
  const { data } = React.useContext(DataContext);

  const sidebarNavItems = [
    {
      title: "Profile",
      href: "/dashboard/account",
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
      href: "/dashboard/appearance",
      category: "profile",
    },
    // {
    //   title: "Notifications",
    //   href: "/dashboard/notifications",
    //   category: "account",
    // },
    // {
    //   title: "View my page",
    //   href: `/gallery/${data && data.username}`,
    //   category: "profile",
    // },
  ];

  return (
    <ToastProvider>
      <div className="space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5 flex justify-between items-start">
          <div className="flex flex-col gap-3">
            <Link href="/" className="text-2xl font-bold tracking-tight">
              ZOKA
            </Link>
            <p className="text-muted-foreground">
              Manage your profile to show your best photos
            </p>
          </div>
          <Link target="_blank" href={"/gallery/" + data.username}>
            <Button className="flex items-center gap-3" variant="default">
              View my page
            </Button>
          </Link>
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
    </ToastProvider>
  );
}
