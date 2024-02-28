import { supabase } from "@/lib/supabase";
import * as React from "react";
import { uid } from "uid";
import { CircleEllipsisIcon, ImageIcon } from "lucide-react";
import { DataContext } from "@/utlis/userContext";
import imageCompression from "browser-image-compression";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../ui/button";

export function AddBackground({ background }: any) {
  const { reloadData } = React.useContext(DataContext);
  const { data } = React.useContext(DataContext);
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      uploadPhoto(event.target.files[0]);
    }
  };

  const handleClick = () => {
    hiddenFileInput.current && hiddenFileInput.current.click();
  };

  const uploadPhoto = async (image: File) => {
    if (!data.userData.id) {
      return;
    }

    const { data: existingBackground, error: existingError } =
      await supabase.storage
        .from("users_photos")
        .list(`${data.userData.id}/background`);

    if (existingBackground && existingBackground.length >= 1) {
      const existingBackgroundId = existingBackground[0].name;

      await supabase.storage
        .from(`users_photos`)
        .remove([`${data.userData.id}/background/${existingBackgroundId}`]); // Utiliser l'ID pour supprimer le fichier
    }

    const fileName = image?.name;
    const re = /(?:\.([^.]+))?$/;

    if (fileName) {
      console.log(fileName);

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
          const { data: backgroundUpload, error } = await supabase.storage
            .from(`users_photos/${data.userData.id}/background`)
            .upload(`${uuidv4()}.${fileExtension}`, compressedFile);

          if (backgroundUpload && backgroundUpload.path)
            updateUserBackground(backgroundUpload.path);
        } else {
          const { data: backgroundUpload, error } = await supabase.storage
            .from(`users_photos/${data.userData.id}/background`)
            .upload(
              `${data.userData.id}_${Date.now()}_${uniq_id}.${fileExtension}`,
              image
            );

          if (backgroundUpload && backgroundUpload.path)
            updateUserBackground(backgroundUpload.path);
        }
        reloadData();
      } catch (error) {
        // console.error(
        //   "Erreur lors du téléchargement de la photo background :",
        //   error
        // );
      }
    }
  };

  const updateUserBackground = async (imageUrl: string) => {
    const { data: updatedUser, error } = await supabase
      .from("users")
      .update({ background: imageUrl })
      .eq("id", data.userData.id);

    if (error) {
      return;
    }
  };

  return (
    <div className="absolute top-6 right-6 z-10 flex items-center gap-3">
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        accept="image/*"
        style={{ display: "none" }}
      />
      <Button onClick={() => handleClick()} className="">
        <ImageIcon className="w-6 h-6" />
      </Button>
    </div>
  );
}
