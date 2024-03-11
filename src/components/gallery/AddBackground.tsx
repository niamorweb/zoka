import { supabase } from "@/lib/supabase";
import * as React from "react";
import { uid } from "uid";
import { CircleEllipsisIcon, ImageIcon } from "lucide-react";
import { DataContext } from "@/utils/userContext";
import imageCompression from "browser-image-compression";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../ui/button";
import axios from "axios";

export function AddBackground({ background }: any) {
  const { reloadData } = React.useContext(DataContext);
  const { data } = React.useContext(DataContext);
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const files = event.target.files;
      if (files && files.length > 0) {
        const file = files[0];

        const options = {
          useWebWorker: true,
        };

        try {
          const compressedFile = await imageCompression(file, options);

          const compressedFileAsFile = new File([compressedFile], file.name, {
            type: compressedFile.type,
          });

          if (data.userData.background) {
            await deletePreviousPhoto();
          }

          const formData = new FormData();
          formData.append("file", compressedFileAsFile);
          formData.append("upload_preset", "wul4xihj");
          formData.append(
            "folder",
            `kuta/users_photos/${data.userData.id}/background`
          );

          try {
            const response = await axios.post(
              "https://api.cloudinary.com/v1_1/dfez6bupb/image/upload",
              formData
            );

            const secure_url = response.data.secure_url;
            if (secure_url) {
              await supabase
                .from("users")
                .update({ background: secure_url })
                .eq("id", data.userData.id);
            }
          } catch (error) {}
        } catch (error) {}
        reloadData();
      }
    }
  };

  const deletePreviousPhoto = async () => {
    const regex = /\/kuta\/users_photos\/[^\/]+\/background\/[^\/]+/;
    const match = data.userData.background.match(regex);

    if (match) {
      const extractedPart = match[0];
      const cheminSansExtension = extractedPart.replace(/^\/(.+)\..+$/, "$1");

      try {
        const publicId = cheminSansExtension;
        const response = await axios.delete("/api/destroy-image", {
          data: { publicId },
        });
      } catch (error) {}
    }
  };

  const handleClick = () => {
    hiddenFileInput.current && hiddenFileInput.current.click();
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
