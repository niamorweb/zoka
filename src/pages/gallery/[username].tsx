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
  const [userPhotos, setUserPhotos] = useState<{ name: string; url: string }[]>(
    []
  );
  const [userInfos, setUserInfos] = useState<userInfos>();
  const [userId, setUserId] = useState<String | null>(null);
  const [showcaseVisible, setShowcaseVisible] = useState<Boolean>(false);
  const [currentPhotoSelected, setCurrentPhotoSelected] = useState<Number>(0);
  const [photosUrl, setPhotosUrl] = useState<Array<string>>([]);

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

    setUserId(data.id);
    setUserInfos(data);
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

    // setPhotosUrl(photos);
    // const compressedPhotos = await Promise.all(
    //   photos.map(async (file) => {
    //     const url: string = (await compressImageUrl(file.name)) as string;
    //     return { name: file.name, url };
    //   })
    // );

    // setUserPhotos(compressedPhotos);
  };

  // const compressImageUrl = async (imageName: string) => {
  //   const imageUrl = await supabase.storage
  //     .from("users_photos")
  //     .getPublicUrl(`${userId}/${imageName}`);

  //   const response = await fetch(imageUrl.data.publicUrl);
  //   const blob: any = await response.blob();

  //   // Options de compression (vous pouvez ajuster selon vos besoins)
  //   const options = {
  //     maxSizeMB: 0.4, // Taille maximale de l'image compressée en MB
  //     maxWidthOrHeight: 800, // Largeur ou hauteur maximale de l'image compressée
  //     useWebWorker: true, // Utiliser un Web Worker pour le traitement asynchrone (facultatif)
  //   };

  //   // Compresser l'image
  //   const compressedBlob: any = await imageCompression(blob, options);

  //   // Convertir l'image compressée en format Base64
  //   const reader = new FileReader();
  //   reader.readAsDataURL(compressedBlob);
  //   return new Promise((resolve, reject) => {
  //     reader.onloadend = () => {
  //       resolve(reader.result as string);
  //     };
  //     reader.onerror = reject;
  //   });
  // };

  return (
    <>
      {showcaseVisible && (
        <ShowcasePhotos
          setShowcaseVisible={setShowcaseVisible}
          setCurrentPhotoSelected={setCurrentPhotoSelected}
          currentPhotoSelected={currentPhotoSelected}
          userPhotos={userPhotos}
        />
      )}

      {userInfos && (
        <div className="min-w-screen min-h-screen bg-black">
          <main className="mx-auto max-w-[1960px] p-4">
            <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
              <div className="after:content relative mb-5 flex flex-col items-start justify-end gap-4 overflow-hidden rounded-lg bg-white/10 px-6 pb-16 pt-64 text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0">
                <h1 className=" mt-8 text-base font-bold uppercase tracking-widest">
                  {userInfos.full_name}
                </h1>
                <p className="mb-4 text-white/75">{userInfos.bio}</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="secondary">MY LINKS</Button>
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
                    src={photo}
                    width={720}
                    height={480}
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
    </>
  );
};

export default Gallery;
