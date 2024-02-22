import { useContext, useEffect, useState } from "react";
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
  const { data: galleryPhotos, error: galleryError } = await supabase.storage
    .from("users_photos")
    .list(`${userId}/gallery`);

  const { data: avatarPhotos, error: avatarError } = await supabase.storage
    .from("users_photos")
    .list(`${userId}/avatar`);

  const { data: backgroundPhotos, error: backgroundError } =
    await supabase.storage.from("users_photos").list(`${userId}/background`);

  if (galleryError) {
    return [];
  }

  const photoArrayUrl: Array<string> = [];
  galleryPhotos.map((photo, index) => {
    if (index !== 0) {
      photoArrayUrl.push(
        `https://izcvdmliijbnyeskngqj.supabase.co/storage/v1/object/public/users_photos/${userId}/gallery/${photo.name}`
      );
    }
  });
  return {
    gallery: photoArrayUrl || [],
    avatar: avatarPhotos || [],
    background: backgroundPhotos || [],
  };
};

const Gallery = ({ userInfos, photosUrl }: any) => {
  const { data, reloadData } = useContext(DataContext);
  const [bgTranslation, setBgTranslation] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setBgTranslation(window.pageYOffset / 2);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={work_sans.className}>
      <div className={`min-w-screen min-h-screen`}>
        {userInfos && (
          <main
            className={`mx-auto grid gap-5 w-full min-h-screen max-w-[1960px] `}
          >
            <div
              className={` max-h-[900px] text-white overflow-hidden flex flex-col gap-2 relative px-4 lg:px-24 pt-16 pb-10 lg:pt-24 lg:pb-32 shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight`}
            >
              <div className="absolute -z-10 left-0 top-0 h-full w-full bg-black/30 lg:bg-transparent lg:bg-gradient-to-r lg:from-[#00000094] lg:to-[#0000000d]"></div>
              {photosUrl && photosUrl.background && photosUrl.background[0] ? (
                <Image
                  style={{ transform: `translateY(${bgTranslation}px)` }}
                  className="absolute h-full w-full top-0 left-0 right-0 bottom-0 object-cover -z-20"
                  src={`https://izcvdmliijbnyeskngqj.supabase.co/storage/v1/object/public/users_photos/${userInfos.id}/background/${photosUrl.background[0].name}`}
                  width={1600}
                  height={1000}
                  alt=""
                />
              ) : (
                <div className="absolute bg-neutral-900 h-full w-full top-0 left-0 right-0 bottom-0 object-cover -z-10"></div>
              )}

              <div className="flex flex-col gap-3">
                {photosUrl && photosUrl.avatar && photosUrl.avatar[0] ? (
                  <Image
                    className={`w-24 lg:w-44 cursor-pointer  duration-150  h-24 lg:h-44 mb-4 object-cover rounded-full border-black border-2`}
                    src={`https://izcvdmliijbnyeskngqj.supabase.co/storage/v1/object/public/users_photos/${userInfos.id}/avatar/${photosUrl.avatar[0].name}`}
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
            <div className="columns-1 p-4 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
              {photosUrl.gallery &&
                photosUrl.gallery.length > 0 &&
                photosUrl.gallery.map((photo: string, index: number) => (
                  <div
                    key={index}
                    className="after:content group relative mb-5 block w-full after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
                  >
                    <Image
                      placeholder="blur"
                      blurDataURL={`/_next/image?url=${photo}&w=16&q=1`}
                      alt="Next.js Conf photo"
                      className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                      style={{ transform: "translate3d(0, 0, 0)" }}
                      src={photo + "?width=500&height=600"}
                      width={720}
                      height={480}
                      quality={50}
                      sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
                    />
                  </div>
                ))}
            </div>
          </main>
        )}
      </div>
      <Footer />
    </div>
  );
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

  const photosUrl = data ? await fetchPhotos(data.id) : [];

  return { userInfos: data, photosUrl };
};

export default Gallery;
