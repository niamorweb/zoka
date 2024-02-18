import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import Testimonials from "@/components/home/Testimonials";
import Pricing from "@/components/home/Pricing";
import DemoProfile from "@/components/home/DemoProfile";
import DashboardFeature from "@/components/home/DashboardFeatures";
import Head from "next/head";
import { DataContext } from "@/utlis/userContext";
import DonationsSection from "@/components/home/DonationsSection";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data } = React.useContext(DataContext);

  return (
    <>
      <Head>
        <title>KUTA - Share your photos</title>
        <meta
          name="description"
          content="A website for sharing your photos and links with the world."
        />
        <meta
          name="keywords"
          content="photos, sharing, links, social network, media, website"
        />
        <meta name="author" content="niamorweb" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="fixed h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-100" />
      <div className={`min-h-screen relative px-5 lg:px-10 ${inter.className}`}>
        <Header />
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <Link
              href="/"
              className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
            >
              Follow along on Twitter
            </Link>
            <h1 className="font-heading font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
              The platform for sharing your photos and links.
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Craft your profile page and showcase your finest photos,
              complemented with links to your social media, website, and beyond.
            </p>
            <div className="space-x-4">
              <Link
                href={data ? `/${data.username}` : "/s/signin"}
                className={cn(buttonVariants({ size: "lg" }))}
              >
                Get Started
              </Link>
              <Link
                href="/demo"
                target="_blank"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" })
                )}
              >
                See Demo
              </Link>
            </div>
          </div>
        </section>
        <DemoProfile />
        <DashboardFeature />
        <DonationsSection />

        {/* <Pricing /> */}
        {/* <Testimonials /> */}

        <Footer />
      </div>
    </>
  );
}
