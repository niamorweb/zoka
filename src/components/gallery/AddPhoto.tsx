import { supabase } from "@/lib/supabase";
import * as React from "react";
import { uid } from "uid";
import { CircleEllipsisIcon, ImageIcon } from "lucide-react";
import { DataContext } from "@/utlis/userContext";
import imageCompression from "browser-image-compression";
import { toast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from "uuid";
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
import axios from "axios";

export function AddPhoto({ updateInfos }: any) {
  const [fileToUpload, setFileToUpload] = React.useState<File | null>(null);
  const [title, setTitle] = React.useState<string>("");
  const { data, reloadData } = React.useContext(DataContext);
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

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

    if (data.photoData.length >= 15) {
      toast({ variant: "destructive", title: "Maximum 15 images" });
      return;
    }
    toast({
      title: "Uploading",
    });

    const options = {
      maxSizeMB: 0.4, // maximum size of the compressed image, in MB
      maxWidthOrHeight: 1000, // maximum width or height of the compressed image
      useWebWorker: true, // use web worker for parallel compression
    };

    try {
      const compressedFile = await imageCompression(fileToUpload, options);

      // Créer un nouvel objet File à partir du blob compressé
      const compressedFileAsFile = new File(
        [compressedFile],
        fileToUpload.name,
        {
          type: compressedFile.type,
        }
      );

      const formData = new FormData();
      formData.append("file", compressedFileAsFile);
      formData.append("upload_preset", "wul4xihj");
      formData.append(
        "folder",
        `kuta/users_photos/${data.userData.id}/gallery`
      ); // Spécifiez le dossier et le sous-dossier ici

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dfez6bupb/image/upload",
          formData
        );

        const secure_url = response.data.secure_url;
        if (secure_url) {
          await createItem(secure_url);
          toast({
            title: "Image uploaded !",
          });
          setFileToUpload(null);
          setTitle("");
          setOpen(false);
        }
      } catch (error) {}
    } catch (error) {}
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
      return;
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <ImageIcon className="cursor-pointer duration-150 hover:scale-105 w-8 h-8" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upload image ( Maximum 15 photos )</DialogTitle>
            {data && data.photoData && data.photoData.length >= 15 && (
              <DialogDescription>
                <p className="text-red-500">Limit of images uploaded reached</p>
              </DialogDescription>
            )}
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
              disabled={
                !fileToUpload ||
                isDisabled ||
                (data && data.photoData && data.photoData.length >= 15)
              }
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
