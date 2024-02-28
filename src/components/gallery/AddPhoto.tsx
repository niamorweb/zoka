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
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { DialogFooter, DialogHeader } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function AddPhoto({ updateInfos }: any) {
  const [fileToUpload, setFileToUpload] = React.useState<File | null>(null);
  const [title, setTitle] = React.useState<string>("");
  const { data, reloadData } = React.useContext(DataContext);
  const [isDisabled, setIsDisabled] = React.useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFileToUpload(files[0]);
    }
  };

  const handleUploadPhoto = async () => {
    if (!data.userData.id || !fileToUpload) {
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

    const fileName = fileToUpload?.name;

    const re = /(?:\.([^.]+))?$/;

    if (fileName) {
      const match = re.exec(fileName);
      const fileExtension: string | null = match && match[1];

      const uniq_id: string = uid();

      if (fileToUpload) {
        if (fileToUpload.size > 2 * 1024 * 1024) {
          try {
            const options = {
              maxSizeMB: 2,
              useWebWorker: true,
            };
            const compressedFile = await imageCompression(
              fileToUpload,
              options
            );
            const { data: uploadData, error } = await supabase.storage
              .from(`users_photos/${data.userData.id}/gallery`)
              .upload(`${uuidv4()}.${fileExtension}`, compressedFile);
            if (uploadData && uploadData.path) {
              await createItem(uploadData.path);
              toast({
                title: "Image uploaded !",
              });
              setFileToUpload(null);
              setTitle("");
            } else {
              console.error("Error uploading image:", error);
            }
          } catch (error) {
            console.error("Error uploading compressed image:", error);
          }
        } else {
          const { data: uploadData, error } = await supabase.storage
            .from(`users_photos/${data.userData.id}/gallery`)
            .upload(
              `${data.userData.id}_${Date.now()}_${uniq_id}.${fileExtension}`,
              fileToUpload
            );

          if (uploadData && uploadData.path) {
            await createItem(uploadData.path);
            toast({
              title: "Image uploaded !",
            });
            setFileToUpload(null);
            setTitle("");
          } else {
            console.error("Error uploading image:", error);
          }
        }
      }
    }
    updateInfos();
  };

  const createItem = async (imageUrl: string) => {
    const { data: newItem, error } = await supabase.from("items").insert([
      {
        user_id: data.userData.id,
        title,
        image_url: imageUrl,
      },
    ]);

    if (error) {
      console.error("Error creating item:", error.message);
      return;
    }

    console.log("New item created:", newItem);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <ImageIcon className="cursor-pointer w-8 h-8" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upload image</DialogTitle>
            <DialogDescription>
              {isDisabled && (
                <p className="text-red-600 ">
                  Error : Limit of 15 images exceeded
                </p>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <Label htmlFor="title">Title ( will be hidden if empty )</Label>
            <Input
              name="title"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="file">Choose File</Label>
            <Input
              type="file"
              accept="image/*"
              id="file"
              onChange={handleFileChange}
            />
          </div>
          <DialogFooter>
            <Button
              onClick={handleUploadPhoto}
              disabled={!fileToUpload || isDisabled}
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
