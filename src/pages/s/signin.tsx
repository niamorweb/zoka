// import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { UserAuthForm } from "@/components/auth/signin/user-auth-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Head from "next/head";
import { Toaster } from "@/components/ui/toaster";

// export const metadata: Metadata = {
//   title: "Authentication",
//   description: "Authentication forms built using the components.",
// };

export default function AuthenticationPage() {
  return (
    <>
      <Head>
        <title>Sign in - KUTA</title>
        <meta
          name="description"
          content="Sign in to access your account on KUTA."
        />
        <meta
          name="keywords"
          content="login, account, access, authentication, KUTA"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster />

      <div
        className={`min-h-screen bg-[url('/images/home/noise.png')] flex items-center justify-center bg-greenDark relative pt-5 px-5 lg:px-10 `}
      >
        <Link
          href="/s/signup"
          className="absolute bg-greenLight text-greenDark px-6 py-2 rounded-lg right-4 top-4 md:right-8 md:top-8"
        >
          Sign up
        </Link>
        <div className="p-8 bg-white rounded-lg">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 ">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Login to your account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your login details below to access to your account
              </p>
            </div>
            <UserAuthForm />
          </div>
        </div>
      </div>
    </>
  );
}
