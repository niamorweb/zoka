import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import imageCompression from "browser-image-compression"; // Importez la bibliothèque de compression d'image
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ChevronRight } from "lucide-react";
import ShowcasePhotos from "@/components/gallery/showcasePhotos";
import { useLockBody } from "@/hooks/use-lock-body";
import getBase64 from "@/lib/getBase64";
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

const Gallery = () => {
  const router = useRouter();
  const { username } = router.query;
  const [userInfos, setUserInfos] = useState<userInfos>();
  const [userId, setUserId] = useState<String | null>(null);
  const [showcaseVisible, setShowcaseVisible] = useState<Boolean>(false);
  const [currentPhotoSelected, setCurrentPhotoSelected] = useState<Number>(0);
  const [photosUrl, setPhotosUrl] = useState<Array<string>>([]);
  const [userTheme, setUserTheme] = useState<String>("dark");

  useEffect(() => {
    if (!username) return;
    fetchUserInfos();
    fetchPhotos();
  }, [username, userId]);

  const fetchUserInfos = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .single();

    if (data) {
      setUserTheme(data.theme);

      setUserId(data.id);
      setUserInfos(data);
    }
  };

  const fetchPhotos = async () => {
    const { data: photos, error } = await supabase.storage
      .from("users_photos")
      .list(`${userId}`);

    if (error) {
      return;
    }

    const photoArrayUrl: Array<string> = [];
    photos.map((photo) => {
      photoArrayUrl.push(
        `https://izcvdmliijbnyeskngqj.supabase.co/storage/v1/object/public/users_photos/${userId}/${photo.name}`
      );
    });
    setPhotosUrl(photoArrayUrl);
  };

  return (
    <>
      {showcaseVisible && (
        <ShowcasePhotos
          setShowcaseVisible={setShowcaseVisible}
          setCurrentPhotoSelected={setCurrentPhotoSelected}
          currentPhotoSelected={currentPhotoSelected}
          photosUrl={photosUrl}
        />
      )}

      {userInfos && (
        <div
          className={`min-w-screen min-h-screen ${
            userTheme === "dark" ? "bg-black" : "bg-slate-50"
          }`}
        >
          <main className="mx-auto max-w-[1960px] p-4">
            <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
              <div
                className={`after:content col relative mb-5 flex flex-col items-start justify-end gap-4 overflow-hidden rounded-lg ${
                  userTheme === "dark"
                    ? "bg-white/10 text-white"
                    : "bg-neutral-200 text-neutral-900"
                }  px-6 pb-16 pt-64  shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0`}
              >
                <h1 className=" mt-8 text-base font-bold uppercase tracking-widest">
                  {userInfos.full_name}
                </h1>
                <p
                  className={`mb-4  ${
                    userTheme === "dark"
                      ? "text-white"
                      : "text- text-neutral-900"
                  }`}
                >
                  {userInfos.bio}
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant={userTheme === "dark" ? "secondary" : "default"}
                    >
                      MY LINKS
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>LINKS</DialogTitle>
                      <DialogDescription>
                        Here are all my links!
                      </DialogDescription>
                    </DialogHeader>
                    <Separator />
                    <div className="grid">
                      {userInfos.links &&
                        userInfos.links.map((link, index) => (
                          <a
                            key={index}
                            href="https://www.youtube.com"
                            target="_blank"
                            className="flex justify-between items-center py-3 px-2 rounded-lg hover:outline-2 hover:outline outline-neutral-600 duration-100"
                          >
                            <div className="grid">
                              <span className="text-black">{link.name}</span>
                              <span className="text-neutral-500">
                                {link.url}
                              </span>
                            </div>
                            <ChevronRight className="text-neutral-500" />
                          </a>
                        ))}
                    </div>
                    {/* <DialogFooter>
                      <Button type="submit">Share page</Button>
                    </DialogFooter> */}
                  </DialogContent>
                </Dialog>
              </div>
              {photosUrl.map((photo, index) => (
                <div
                  onClick={() => {
                    setShowcaseVisible(true);
                    setCurrentPhotoSelected(index);
                  }}
                  // onClick={() => openOriginalImage(image.name)}
                  key={index}
                  className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
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
        </div>
      )}
      <Separator className="my-14" orientation="horizontal" />
      <p className="text-center mb-10">
        Built by Zoka -
        <Link target="_blank" className="underline underline-offset-2" href="/">
          Create your own page here
        </Link>
      </p>
    </>
  );
};

export default Gallery;
