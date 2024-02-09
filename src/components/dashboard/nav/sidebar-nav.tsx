import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
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
  const pathname = usePathname();
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
        {items
          .filter((item) => item.category === "profile")
          .map((item) => (
            <Link
              key={item.href}
              href={item.href}
              target={item.title === "View my page" ? "_blank" : undefined}
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
        {items
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
