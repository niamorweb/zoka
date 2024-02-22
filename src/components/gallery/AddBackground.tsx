import { supabase } from "@/lib/supabase";
import * as React from "react";
import { uid } from "uid";
import { CircleEllipsisIcon, ImageIcon } from "lucide-react";
import { DataContext } from "@/utlis/userContext";
import imageCompression from "browser-image-compression";
import { toast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { Button } from "../ui/button";

export function AddBackground({ background }: any) {
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

    // Supprimer background existant s'il y en a un
    const { data: existingBackground, error: existingError } =
      await supabase.storage.from("users_photos").list(`${data.id}/background`);

    if (existingBackground && existingBackground.length >= 1) {
      const existingBackgroundId = existingBackground[0].name;

      await supabase.storage
        .from(`users_photos`)
        .remove([`${data.id}/background/${existingBackgroundId}`]); // Utiliser l'ID pour supprimer le fichier
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
            .from(`users_photos/${data.id}/background`)
            .upload(`${uuidv4()}.${fileExtension}`, compressedFile);
        } else {
          await supabase.storage
            .from(`users_photos/${data.id}/background`)
            .upload(
              `${data.id}_${Date.now()}_${uniq_id}.${fileExtension}`,
              image
            );
        }
        reloadData();
      } catch (error) {
        console.error(
          "Erreur lors du téléchargement de la photo background :",
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
      <Button
        onClick={() => handleClick()}
        className="absolute top-6 right-6 z-10"
      >
        <ImageIcon className="w-6 h-6" />
      </Button>
    </>
  );
}
