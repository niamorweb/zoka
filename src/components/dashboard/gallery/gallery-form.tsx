import { supabase } from "@/lib/supabase";
import { Label } from "@radix-ui/react-label";
import * as React from "react";
import { uid } from "uid";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DotsVerticalIcon, TrashIcon } from "@radix-ui/react-icons";
import { CircleEllipsisIcon } from "lucide-react";
import { DataContext } from "@/utlis/userContext";

export function GalleryForm() {
  const [image, setImage] = React.useState<File | null>(null);
  const { reloadData } = React.useContext(DataContext);
  const { data } = React.useContext(DataContext);

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!data.id) {
      return;
    }

    const fileName = image?.name;

    const re = /(?:\.([^.]+))?$/;

    if (fileName) {
      const match = re.exec(fileName);
      const fileExtension: String | null = match && match[1];

      const uniq_id: string = uid();

      if (image) {
        const { data: uploadData, error } = await supabase.storage
          .from(`users_photos/${data.id}`)
          .upload(
            `${data.id}_${Date.now()}_${uniq_id}.${fileExtension}`,
            image
          );

        if (error) {
          return null;
        } else {
          reloadData();
        }
      }
    }
  };

  const deletePhoto = async (photoName: string) => {
    const { data: userData, error } = await supabase.storage
      .from("users_photos")
      .remove([`${data.id}/${photoName}`]);
    reloadData();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImage(e.target.files[0]);
  };

  return (
    <>
      <form onSubmit={onSubmit} className="space-y-8">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="picture">Picture</Label>
          <Input onChange={handleImageChange} id="picture" type="file" />
        </div>
        <Button disabled={!image} variant="outline" type="submit">
          Add this photo
        </Button>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {data &&
          data.photos &&
          data.photos.length > 0 &&
          data.photos.map((photo: any, index: number) => (
            <div key={index} className="flex flex-col gap-1 items-end">
              <Image
                width={300}
                height={300}
                src={photo.url}
                alt="image"
                className="h-[200px] w-full object-cover"
              />
              <AlertDialog>
                <AlertDialogTrigger>
                  <DotsVerticalIcon className="w-6 h-6" />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete this photo ?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone.
                      <Image
                        src={photo.url}
                        width={400}
                        height={400}
                        alt="Photo to delete"
                        className="w-full object-cover"
                      />
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => deletePhoto(photo.name)}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ))}
      </div>
    </>
  );
}
