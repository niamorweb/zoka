import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/registry/new-york/ui/button";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
    category: String;
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const [userId, setUserId] = useState<String>();
  const [userData, setUserData] = useState();

  const router = useRouter();
  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      data.user && setUserId(data.user.id);
    };

    checkUser();
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        return;
      }
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId);

      data && setUserData(data[0]);
    };

    fetchData();
  }, [userId]);

  const pathname = usePathname();

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
      href: "/dashboard/appearance",
      category: "profile",
    },
    {
      title: "Notifications",
      href: "/dashboard/notifications",
      category: "account",
    },
    {
      title: "View my page",
      href: `/gallery/${userData && userData["username"]}`,
      category: "profile",
    },
  ];

  return (
    <nav
      className={cn(
        "flex flex-col gap-4 space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
          className
        )}
      >
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Dashboard
        </h2>
        {sidebarNavItems
          .filter((item) => item.category === "profile")
          .map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                pathname === item.href
                  ? "bg-muted hover:bg-muted"
                  : "hover:bg-transparent hover:underline",
                "justify-start"
              )}
            >
              {item.title}
            </Link>
          ))}
      </div>

      <div
        className={cn(
          "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
          className
        )}
      >
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Account
        </h2>
        {sidebarNavItems
          .filter((item) => item.category === "account")
          .map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                pathname === item.href
                  ? "bg-muted hover:bg-muted"
                  : "hover:bg-transparent hover:underline",
                "justify-start"
              )}
            >
              {item.title}
            </Link>
          ))}
      </div>
    </nav>
  );
}
