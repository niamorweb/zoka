import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import Head from "next/head";

export default function contact() {
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

      <div
        className={`min-h-screen bg-[url('/images/home/noise.png')]  bg-greenDark text-greenLight relative pt-5 px-5 lg:px-10`}
      >
        <Header />

        <Footer />
      </div>
    </>
  );
}
