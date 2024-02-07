"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import imageCompression from "browser-image-compression"; // Importez la bibliothèque de compression d'image
import { useRouter } from "next/navigation";

interface userInfos {
  bio: String | null;
  created_at: String;
  email: String | null;
  full_name: String | null;
  language: String | null;
  links: Array<String> | null;
  theme: String;
  user_id: String;
  username: String;
}

const Gallery = ({ params }: { params: { username: string } }) => {
  const router = useRouter();
  const [userPhotos, setUserPhotos] = useState<{ name: string; url: string }[]>(
    []
  );
  const [userInfos, setUserInfos] = useState<userInfos>();
  const [userId, setUserId] = useState<String | null>(null);

  useEffect(() => {
    if (!params.username) return;
    fetchUserInfos();
    fetchPhotos();
  }, [params.username, userId]);

  const fetchUserInfos = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", params.username)
      .single();

    console.log(data);

    setUserId(data.id);
    setUserInfos(data);
  };

  const fetchPhotos = async () => {
    const { data: photos, error } = await supabase.storage
      .from("users_photos")
      .list(`${userId}`);

    console.log(photos);

    if (error) {
      console.error(
        "Erreur lors de la récupération des photos :",
        error.message
      );
      return;
    }
    const compressedPhotos = await Promise.all(
      photos.map(async (file) => {
        const url: string = (await compressImageUrl(file.name)) as string;
        return { name: file.name, url };
      })
    );

    setUserPhotos(compressedPhotos);
  };

  const compressImageUrl = async (imageName: string) => {
    const imageUrl = await supabase.storage
      .from("users_photos")
      .getPublicUrl(`${userId}/${imageName}`);

    const response = await fetch(imageUrl.data.publicUrl);
    const blob: any = await response.blob();

    // Options de compression (vous pouvez ajuster selon vos besoins)
    const options = {
      maxSizeMB: 0.4, // Taille maximale de l'image compressée en MB
      maxWidthOrHeight: 800, // Largeur ou hauteur maximale de l'image compressée
      useWebWorker: true, // Utiliser un Web Worker pour le traitement asynchrone (facultatif)
    };

    // Compresser l'image
    const compressedBlob: any = await imageCompression(blob, options);

    // Convertir l'image compressée en format Base64
    const reader = new FileReader();
    reader.readAsDataURL(compressedBlob);
    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
    });
  };

  const openOriginalImage = (imageName: String) => {
    const originalUrl: string = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/users_photos/${userId}/${imageName}`;
    window.open(originalUrl, "_blank");
  };

  return (
    <>
      <div className="min-w-screen min-h-screen bg-black">
        <main className="mx-auto max-w-[1960px] p-4">
          <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
            <div className="after:content relative mb-5 flex h-[629px] flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-white/10 px-6 pb-16 pt-64 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0">
              <h1 className="mb-4 mt-8 text-base font-bold uppercase tracking-widest">
                {userInfos && userInfos.username}
              </h1>
              <p className="max-w-[40ch] text-white/75 sm:max-w-[32ch]">
                {userInfos && userInfos.bio}
              </p>
              <a
                className="pointer z-10 mt-6 rounded-lg border border-white bg-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-white/10 hover:text-white md:mt-4"
                href="https://vercel.com/new/clone?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-cloudinary&project-name=nextjs-image-gallery&repository-name=with-cloudinary&env=NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,CLOUDINARY_API_KEY,CLOUDINARY_API_SECRET,CLOUDINARY_FOLDER&envDescription=API%20Keys%20from%20Cloudinary%20needed%20to%20run%20this%20application"
                target="_blank"
                rel="noreferrer"
              >
                My other links
              </a>
            </div>
            {userPhotos.map((image, index) => (
              <div
                onClick={() => openOriginalImage(image.name)}
                key={index}
                className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
              >
                <Image
                  alt="Next.js Conf photo"
                  className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                  style={{ transform: "translate3d(0, 0, 0)" }}
                  src={image.url}
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
    </>
  );
};

export default Gallery;
