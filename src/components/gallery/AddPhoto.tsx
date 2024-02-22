import { supabase } from "@/lib/supabase";
import * as React from "react";
import { uid } from "uid";
import { CircleEllipsisIcon, ImageIcon } from "lucide-react";
import { DataContext } from "@/utlis/userContext";
import imageCompression from "browser-image-compression";
import { toast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";

export function AddPhoto() {
  const { reloadData } = React.useContext(DataContext);
  const { data } = React.useContext(DataContext);
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);
  const router = useRouter();

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

    toast({
      title: "Uploading",
    });

    const { data: photos, error } = await supabase.storage
      .from("users_photos")
      .list(`${data.id}/gallery`);

    if (photos && photos.length >= 15) {
      toast({
        variant: "destructive",
        title: "The maximum image limit has been reached (15 images).",
      });
      return;
    }

    const fileName = image?.name;

    const re = /(?:\.([^.]+))?$/;

    if (fileName) {
      const match = re.exec(fileName);
      const fileExtension: String | null = match && match[1];

      const uniq_id: string = uid();

      if (image) {
        if (image.size > 2 * 1024 * 1024) {
          try {
            const options = {
              maxSizeMB: 2,
              useWebWorker: true,
            };
            const compressedFile = await imageCompression(image, options);
            const { data: uploadData, error } = await supabase.storage
              .from(`users_photos/${data.id}/gallery`)
              .upload(`${uuidv4()}.${fileExtension}`, compressedFile);

            if (error) {
              return null;
            } else {
              reloadData();

              router.reload();
            }
          } catch (error) {}
        } else {
          const { data: uploadData, error } = await supabase.storage
            .from(`users_photos/${data.id}/gallery`)
            .upload(
              `${data.id}_${Date.now()}_${uniq_id}.${fileExtension}`,
              image
            );

          if (error) {
            return null;
          } else {
            reloadData();
            router.reload();
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
        multiple
      />

      <ImageIcon onClick={handleClick} className="w-6 h-6" />
    </>
  );
}
