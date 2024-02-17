import { supabase } from "@/lib/supabase";
import * as React from "react";
import { uid } from "uid";
import { CircleEllipsisIcon, ImageIcon } from "lucide-react";
import { DataContext } from "@/utlis/userContext";
import imageCompression from "browser-image-compression";
import { toast } from "@/components/ui/use-toast";

export function AddPhoto() {
  const { reloadData } = React.useContext(DataContext);
  const { data } = React.useContext(DataContext);
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);

  const handleChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      console.log(event.target.files[0]);

      uploadPhoto(event.target.files[0]);
    }
  };

  const handleClick = () => {
    hiddenFileInput.current && hiddenFileInput.current.click();
  };

  const uploadPhoto = async (image: File) => {
    console.log("upload !!");
    if (!data.id) {
      return;
    }

    const { data: photos, error } = await supabase.storage
      .from("users_photos")
      .list(`${data.id}`);

    console.log("data ,", photos);

    if (photos && photos.length >= 15) {
      toast({
        variant: "destructive",
        title: "The maximum image limit has been reached (15 images).",
      });
      return;
    }

    const fileName = image?.name;

    console.error("Erreur de compression d'image : ", image);
    const re = /(?:\.([^.]+))?$/;

    console.error("Erreur de compression d'image : ", fileName);

    if (fileName) {
      const match = re.exec(fileName);
      const fileExtension: String | null = match && match[1];

      const uniq_id: string = uid();

      if (image) {
        console.log(image.size);

        if (image.size > 2 * 1024 * 1024) {
          try {
            const options = {
              maxSizeMB: 2,
              useWebWorker: true,
            };
            const compressedFile = await imageCompression(image, options);
            const { data: uploadData, error } = await supabase.storage
              .from(`users_photos/${data.id}`)
              .upload(
                `${data.id}_${Date.now()}_${uniq_id}.${fileExtension}`,
                compressedFile // Utilisation du fichier compressé
              );

            if (error) {
              return null;
            } else {
              reloadData();
            }
          } catch (error) {
            console.error("Erreur de compression d'image : ", error);
          }
        } else {
          const { data: uploadData, error } = await supabase.storage
            .from(`users_photos/${data.id}`)
            .upload(
              `${data.id}_${Date.now()}_${uniq_id}.${fileExtension}`,
              image
            );

          if (error) {
            console.log(error);

            return null;
          } else {
            reloadData();
          }
        }
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

      <ImageIcon onClick={handleClick} className="w-6 h-6" />
    </>
  );
}
