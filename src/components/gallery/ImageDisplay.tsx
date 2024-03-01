import Image from "next/image";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { supabase } from "@/lib/supabase";

export default function ImageDisplay({ data, photo, index, deletePhoto }: any) {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (photo.title) {
      setTitle(photo.title);
    }
  }, [photo.title]);

  const handleTitleChange = async () => {
    try {
      const { data: updatedItem, error } = await supabase
        .from("items")
        .update({ title })
        .eq("id", photo.id);

      console.log("Item updated successfully:", updatedItem);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <div key={index}>
      <div
        key={index}
        className="after:content group relative mb-2 block w-full after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="absolute top-3 right-3 z-30">
              <DotsVerticalIcon />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit image</DialogTitle>
            </DialogHeader>
            <div
              onClick={() => console.log(photo.title)}
              className="flex flex-col gap-3"
            >
              <Label htmlFor="title">Title ( will be hidden if empty )</Label>
              <Input
                name="title"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <Button
              variant="destructive"
              className="flex items-center gap-3 font-medium"
              onClick={() => deletePhoto(photo.image_url)}
            >
              <Trash />
              <span>Delete</span>
            </Button>
            <DialogFooter>
              <Button onClick={() => handleTitleChange()} type="submit">
                Update
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Image
          placeholder="blur"
          blurDataURL={`/_next/image?url=${photo.image_url}?width=100&height=100/&w=16&q=1`}
          alt="Next.js Conf photo"
          className="transform w-full h-full object-cover transition will-change-auto"
          style={{ transform: "translate3d(0, 0, 0)" }}
          src={photo.image_url}
          width={1000}
          height={1000}
          sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
        />
        {photo.title !== "" && photo.title !== null && (
          <p className="absolute bottom-3 right-2 bg-white text-black font-semibold px-4 py-2 rounded-lg">
            {photo.title}
          </p>
        )}
      </div>
    </div>
  );
}
