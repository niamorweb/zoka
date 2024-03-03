import { supabase } from "@/lib/supabase";
import * as React from "react";
import { uid } from "uid";
import { DataContext } from "@/utlis/userContext";
import imageCompression from "browser-image-compression";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import axios from "axios";

export function AddAvatar({}) {
  const { data, reloadData } = React.useContext(DataContext);

  const hiddenFileInput = React.useRef<HTMLInputElement>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      const options = {
        maxSizeMB: 0.1,
        maxWidthOrHeight: 200,
        useWebWorker: true,
      };

      try {
        const compressedFile = await imageCompression(file, options);

        const compressedFileAsFile = new File([compressedFile], file.name, {
          type: compressedFile.type,
        });

        if (data.userData.avatar) {
          await deletePreviousPhoto();
        }

        const formData = new FormData();
        formData.append("file", compressedFileAsFile);
        formData.append("upload_preset", "wul4xihj");
        formData.append(
          "folder",
          `kuta/users_photos/${data.userData.id}/avatar`
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
              .update({ avatar: secure_url })
              .eq("id", data.userData.id);
          }
        } catch (error) {}
      } catch (error) {}
      reloadData();
    }
  };

  const deletePreviousPhoto = async () => {
    const regex = /\/kuta\/users_photos\/[^\/]+\/avatar\/[^\/]+/;
    const match = data.userData.avatar.match(regex);

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
    <>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: "none" }}
      />
      {data && data.userData && data.userData.avatar ? (
        <Image
          onClick={() => handleClick()}
          className="w-24 lg:w-44 cursor-pointer  duration-150  h-24 lg:h-44 mb-4 object-cover rounded-full border-black border-2 hover:border-4"
          src={data.userData.avatar}
          width={100}
          height={100}
          alt=""
        />
      ) : (
        <Image
          onClick={() => handleClick()}
          className="w-24 lg:w-44 cursor-pointer  duration-150  h-24 lg:h-44 mb-4 object-cover rounded-full bg-neutral-200 border-black border-2 hover:border-4"
          src="/logo-large.jpg"
          width={200}
          height={200}
          alt=""
        />
      )}
    </>
  );
}
