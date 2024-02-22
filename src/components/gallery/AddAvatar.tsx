import { supabase } from "@/lib/supabase";
import * as React from "react";
import { uid } from "uid";
import { CircleEllipsisIcon, ImageIcon } from "lucide-react";
import { DataContext } from "@/utlis/userContext";
import imageCompression from "browser-image-compression";
import { toast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";

export function AddAvatar({ avatar, userInfos }: any) {
  const { reloadData } = React.useContext(DataContext);
  const { data } = React.useContext(DataContext);
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files);
      files.forEach((file) => uploadPhoto(file));
    }
  };

  const handleClick = () => {
    hiddenFileInput.current && hiddenFileInput.current.click();
  };

  const uploadPhoto = async (image: File) => {
    if (!data.id) {
      return;
    }

    const { data: existingAvatar, error: existingError } =
      await supabase.storage.from("users_photos").list(`${data.id}/avatar`);

    if (existingAvatar && existingAvatar.length >= 1) {
      const existingAvatarId = existingAvatar[0].name;

      await supabase.storage
        .from(`users_photos`)
        .remove([`${data.id}/avatar/${existingAvatarId}`]); // Utiliser l'ID pour supprimer le fichier
    }

    const fileName = image?.name;
    const re = /(?:\.([^.]+))?$/;

    if (fileName) {
      const match = re.exec(fileName);
      const fileExtension: string | null = match && match[1];
      const uniq_id: string = uid();

      try {
        if (image.size > 0.9 * 1024 * 1024) {
          const options = {
            maxSizeMB: 0.9,
            useWebWorker: true,
          };
          const compressedFile = await imageCompression(image, options);
          await supabase.storage
            .from(`users_photos/${data.id}/avatar`)
            .upload(`${uuidv4()}.${fileExtension}`, compressedFile);
        } else {
          await supabase.storage
            .from(`users_photos/${data.id}/avatar`)
            .upload(
              `${data.id}_${Date.now()}_${uniq_id}.${fileExtension}`,
              image
            );
        }
        reloadData();
      } catch (error) {
        console.error(
          "Erreur lors du téléchargement de la photo d'avatar :",
          error
        );
      }
    }
  };

  return (
    <>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        accept="image/*"
        style={{ display: "none" }}
      />
      {avatar && avatar.name ? (
        <Image
          onClick={() => {
            if (data.username === userInfos.username) {
              handleClick;
            }
          }}
          className={`w-24 lg:w-44 cursor-pointer  duration-150  h-24 lg:h-44 mb-4 object-cover rounded-full border-black border-2 ${
            data.username === userInfos.username && "hover:border-4"
          }`}
          src={`https://izcvdmliijbnyeskngqj.supabase.co/storage/v1/object/public/users_photos/${userInfos.id}/avatar/${avatar.name}`}
          width={200}
          height={200}
          alt=""
        />
      ) : (
        <div
          className={`w-24 lg:w-44 cursor-pointer  duration-150  h-24 lg:h-44 mb-4 object-cover rounded-full bg-neutral-200 border-black border-2 ${
            data.username === userInfos.username && "hover:border-4"
          }`}
        ></div>
      )}
    </>
  );
}
