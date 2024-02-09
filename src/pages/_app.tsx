import { supabase } from "@/lib/supabase";
import "@/styles/globals.css";
import { DataProvider } from "@/utlis/userContext";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AuthProvider from "@/utlis/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <DataProvider>
        <Component {...pageProps} />
      </DataProvider>
    </AuthProvider>
  );
}
