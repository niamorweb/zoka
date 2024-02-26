import { supabase } from "@/lib/supabase";
import * as React from "react";
import { uid } from "uid";
import { CircleEllipsisIcon, ImageIcon } from "lucide-react";
import { DataContext } from "@/utlis/userContext";
import imageCompression from "browser-image-compression";
import { toast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { DialogFooter, DialogHeader } from "../ui/dialog";
import ImageUpload from "./AddPhotoSection";

export function AddPhoto({ updateInfos }: any) {
  const [filesToUpload, setFilesToUpload] = React.useState<File[]>([]);
  const { data, reloadData } = React.useContext(DataContext);
  const [isDisabled, setIsDisabled] = React.useState(false);

  const handleUploadAllPhotos = () => {
    filesToUpload.map((file) => uploadPhoto(file));
    updateInfos();
  };

  const uploadPhoto = async (image: File) => {
    if (!data.userData.id) {
      return;
    }

    toast({
      title: "Uploading",
    });

    const { data: photos, error } = await supabase.storage
      .from("users_photos")
      .list(`${data.userData.id}/gallery`);

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
              .from(`users_photos/${data.userData.id}/gallery`)
              .upload(`${uuidv4()}.${fileExtension}`, compressedFile);
            updateInfos();
          } catch (error) {}
        } else {
          const { data: uploadData, error } = await supabase.storage
            .from(`users_photos/${data.userData.id}/gallery`)
            .upload(
              `${data.userData.id}_${Date.now()}_${uniq_id}.${fileExtension}`,
              image
            );
          updateInfos();
        }
      }
      updateInfos();
    }
  };
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <ImageIcon className="w-6 h-6" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              Upload images ({" "}
              {15 -
                (data &&
                  data.photoData &&
                  data.photoData.gallery &&
                  data.photoData.gallery.length + filesToUpload.length)}{" "}
              / 15 place for new image available){" "}
            </DialogTitle>
            <DialogDescription>
              {isDisabled && (
                <p className="text-red-600 ">
                  Error : Limit of 15 images exceeded
                </p>
              )}
            </DialogDescription>
          </DialogHeader>
          <ImageUpload
            filesToUpload={filesToUpload}
            setFilesToUpload={setFilesToUpload}
            setIsDisabled={setIsDisabled}
          />
          <DialogFooter>
            <Button
              onClick={handleUploadAllPhotos}
              disabled={isDisabled}
              type="submit"
            >
              Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
