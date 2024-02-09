import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { MenuIcon } from "lucide-react";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
    category: String;
  }[];
}

export function MobileNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  const [isMenuActive, setIsMenuActive] = useState<Boolean>(false);

  return (
    <>
      <button
        onClick={() => setIsMenuActive(!isMenuActive)}
        className="absolute top-7 right-7"
      >
        <MenuIcon />
      </button>
      {isMenuActive ? (
        <nav
          className={cn(
            "flex flex-col border-2 border-neutral-200 left-1/2 -translate-x-1/2 rounded-xl py-4 px-4 w-3/5 max-w-[400px] gap-4 space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 fixed bg-white ",
            className
          )}
          {...props}
        >
          <div
            className={cn(
              "flex flex-col space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
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
              "flex flex-col space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
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
      ) : null}
    </>
  );
}
