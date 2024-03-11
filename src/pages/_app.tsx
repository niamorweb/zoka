import "@/styles/globals.css";
import { DataProvider } from "@/utils/userContext";
import type { AppProps } from "next/app";
import AuthProvider from "@/utils/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <DataProvider>
        <Component {...pageProps} />
      </DataProvider>
    </AuthProvider>
  );
}
