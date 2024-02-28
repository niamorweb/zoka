import { useContext, useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { ChevronRight, LogOut, Trash, User } from "lucide-react";
import { DataContext } from "@/utlis/userContext";
// import { toast } from "@/components/ui/use-toast";
import Nav from "@/components/gallery/Nav";
import ProfileSection from "@/components/gallery/ProfileSection";
import Footer from "@/components/gallery/Footer";
import ImageDisplay from "@/components/gallery/ImageDisplay";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Toaster } from "@/components/ui/toaster";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Work_Sans } from "next/font/google";
import Head from "next/head";
import Link from "next/link";

interface link {
  name: String;
  url: String;
}
interface userInfos {
  bio: String | null;
  created_at: String;
  email: String | null;
  full_name: String | null;
  language: String | null;
  links: Array<link> | null;
  theme: String;
  user_id: String;
  username: String;
}

const work_sans = Work_Sans({ subsets: ["latin"] });

const fetchPhotos = async (userId: string) => {
  const { data: dataItems, error } = await supabase
    .from("items")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return dataItems;
};

const Gallery = ({ userInfos, photos }: any) => {
  if (userInfos) {
    console.log(userInfos);

    return (
      <>
        <Head>
          <title>{userInfos.full_name}</title>
          <meta name="description" content={userInfos.description} />
          <meta
            name="keywords"
            content="photos, sharing, links, social network, media, website"
          />
          <meta name="author" content="niamorweb" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={work_sans.className}>
          <Link
            className="hidden absolute gap-2 top-3 right-3  items-center bg-greenDark text-greenLight px-4 py-2 rounded-lg"
            href="/"
          >
            <Image
              src="/logo32.jpg"
              className="rounded-full"
              width={20}
              height={20}
              alt=""
            />
            <span>Created via Kuta</span>
          </Link>
          <div className={`min-w-screen min-h-screen`}>
            {userInfos && (
              <main
                className={`mx-auto grid w-full min-h-screen max-w-[1960px] `}
              >
                <div
                  className={` max-h-[900px] text-white overflow-hidden flex flex-col gap-2 relative px-4 lg:px-24 pt-16 pb-10 lg:pt-24 lg:pb-32 shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight`}
                >
                  <div className="absolute -z-10 left-0 top-0 h-full w-full bg-black/30 lg:bg-transparent lg:bg-gradient-to-r lg:from-[#00000094] lg:to-[#0000000d]"></div>
                  {userInfos.background ? (
                    <Image
                      className="absolute object-center max-h-[1000px] h-full w-screen top-0 left-0 right-0 bottom-0 object-cover -z-20"
                      src={`https://izcvdmliijbnyeskngqj.supabase.co/storage/v1/object/public/users_photos/${userInfos.id}/background/${userInfos.background}`}
                      width={1600}
                      height={1000}
                      alt=""
                    />
                  ) : (
                    <div className="absolute bg-neutral-900 h-full w-full top-0 left-0 right-0 bottom-0 object-cover -z-10"></div>
                  )}

                  <div className="flex flex-col gap-3">
                    {userInfos.avatar ? (
                      <Image
                        className={`w-24 lg:w-44 cursor-pointer  duration-150  h-24 lg:h-44 mb-4 object-cover rounded-full border-black border-2`}
                        src={`https://izcvdmliijbnyeskngqj.supabase.co/storage/v1/object/public/users_photos/${userInfos.id}/avatar/${userInfos.avatar}`}
                        width={200}
                        height={200}
                        alt=""
                      />
                    ) : (
                      <div
                        className={`w-24 lg:w-44 cursor-pointer bg-neutral-200 duration-150  h-24 lg:h-44 mb-4 object-cover rounded-full border-black border-2`}
                      ></div>
                    )}
                    <h1 className="max-w-[600px] text-lg md:text-2xl lg:text-6xl font-extrabold tracking-widest">
                      {userInfos.full_name}
                    </h1>
                    <p className={`max-w-[500px] mb-4 `}>{userInfos.bio}</p>
                    {userInfos.links && (
                      <div className="flex flex-col items-start md:flex-row md:flex-wrap gap-4 md:items-centers mt-4">
                        {userInfos.links &&
                          userInfos.links.map((link: any, index: any) => (
                            <a
                              key={index}
                              href="https://www.youtube.com"
                              target="_blank"
                              className="inline-flex uppercase font-medium h-10 items-center rounded-full bg-black bg-opacity-20 px-4 backdrop-blur-md transition duration-700 ease-in-out hover:bg-white hover:text-black hover:duration-300"
                            >
                              <Image
                                className="mr-2"
                                height={16}
                                width={16}
                                src={`http://www.google.com/s2/favicons?domain=${link.url}`}
                                alt=""
                              />

                              <span className="">{link.name}</span>
                              <ChevronRight className="w-5 h-5" />
                            </a>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="columns-1 p-2 gap-2 sm:columns-2 xl:columns-3 2xl:columns-4">
                  {photos &&
                    photos.map((photo: any, index: number) => (
                      <div
                        key={index}
                        className="after:content group relative mb-2 block w-full after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
                      >
                        <Image
                          placeholder="blur"
                          blurDataURL={`/_next/image?url=https://izcvdmliijbnyeskngqj.supabase.co/storage/v1/object/public/users_photos/${userInfos.id}/gallery/${photo.image_url}?width=100&height=100/&w=16&q=1`}
                          alt="Next.js Conf photo"
                          className="transform transition will-change-auto"
                          style={{ transform: "translate3d(0, 0, 0)" }}
                          src={
                            "https://izcvdmliijbnyeskngqj.supabase.co/storage/v1/object/public/users_photos/" +
                            userInfos.id +
                            "/gallery/" +
                            photo.image_url +
                            "?width=500&height=600"
                          }
                          width={720}
                          height={480}
                          quality={50}
                          sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
                        />
                        {photo.title !== "" && photo.title !== null && (
                          <p className="absolute bottom-3 right-2 bg-white text-black font-semibold px-4 py-2 rounded-lg">
                            {photo.title}
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              </main>
            )}
          </div>
          <Footer />
        </div>
      </>
    );
  }
};

Gallery.getInitialProps = async ({ query }: any) => {
  const { username } = query;
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", username)
    .single();

  if (error) {
    console.error("Error fetching user data:", error.message);
    return { userInfos: null, photosUrl: [] };
  }

  const photos = data ? await fetchPhotos(data.id) : [];

  return { userInfos: data, photos };
};

export default Gallery;
