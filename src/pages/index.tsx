import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import Testimonials from "@/components/home/Testimonials";
import Pricing from "@/components/home/Pricing";
import { useEffect } from "react";
import DemoProfile from "@/components/home/DemoProfile";
import React, { useContext } from "react";
import { DataContext } from "@/utlis/userContext";
import DashboardFeature from "@/components/home/DashboardFeatures";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data } = useContext(DataContext);

  return (
    <div className={`min-h-screen px-5 lg:px-10 ${inter.className}`}>
      <Header />
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <Link
            href="/"
            className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
            target="_blank"
          >
            Follow along on Twitter
          </Link>
          <h1 className="font-heading font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            A <span className="text-[#0045FF]">digital platform</span> for
            sharing your photos and links.{" "}
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Craft your profile page and showcase your finest photos,
            complemented with links to your social media, website, and beyond.
          </p>
          <div className="space-x-4">
            <Link href="/signin" className={cn(buttonVariants({ size: "lg" }))}>
              Get Started
            </Link>
          </div>
        </div>
      </section>
      <DemoProfile />
      <DashboardFeature />

      {/* <Pricing /> */}
      <Testimonials />

      <Footer />
    </div>
  );
}
