import Link from "next/link";
import { UserAuthForm } from "@/components/auth/signup/user-auth-form";
import Head from "next/head";
import { Toaster } from "@/components/ui/toaster";

export default function AuthenticationPage() {
  return (
    <>
      <Head>
        <title>Sign up - KUTA</title>
        <meta
          name="description"
          content="Sign up to access your account on KUTA."
        />
        <meta
          name="keywords"
          content="login, account, access, authentication, kuta"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster />

      <div
        className={`min-h-screen bg-[url('/images/home/noise.png')] flex items-center justify-center bg-greenDark relative pt-5 px-5 lg:px-10 `}
      >
        {" "}
        <Link
          href="/s/signin"
          className="absolute bg-greenLight text-greenDark px-6 py-2 rounded-lg right-4 top-4 md:right-8 md:top-8"
        >
          Login
        </Link>
        <div className="p-8 bg-white rounded-lg">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <UserAuthForm />
          </div>
        </div>
      </div>
    </>
  );
}
