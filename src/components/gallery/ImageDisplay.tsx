import Image from "next/image";
import { Square, Trash } from "lucide-react";
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

export default function ImageDisplay({
  updateInfos,
  data,
  photo,
  index,
  deletePhoto,
}: any) {
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);

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
      setOpen(false);
    } catch (error) {}
  };

  const handleUpdateSize = async (isLargeSize: boolean) => {
    const { data: updatedItem, error } = await supabase
      .from("items")
      .update({ isLargeSize: isLargeSize })
      .eq("id", photo.id);

    updateInfos();
  };

  return (
    <div
      key={index}
      className={`after:content bg-white border-[1px] h-[400px] border-black rounded-md overflow-hidden cursor-zoom-in group relative flex flex-col w-full after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight `}
    >
      {/* <div className="absolute top-3 left-3 z-30 flex items-center gap-3">
        <Button
          onClick={() => handleUpdateSize(false)}
          variant="outline"
          className=""
        >
          <Square className="w-4 h-4" />
        </Button>
        <Button
          onClick={() => handleUpdateSize(true)}
          variant="outline"
          className=""
        >
          <Square className="w-6 h-6" />
        </Button>
      </div> */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="absolute top-3 right-3 z-30">
            <DotsVerticalIcon />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit image</DialogTitle>
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

          <DialogFooter>
            <div className="flex items-center justify-between w-full mt-8">
              <Button
                variant="destructive"
                className="flex items-center gap-3 font-medium"
                onClick={() => {
                  deletePhoto(photo.image_url);
                  setOpen(false);
                }}
              >
                {/* <Trash /> */}
                <span>Delete image</span>
              </Button>
              <Button onClick={() => handleTitleChange()} type="submit">
                Update
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Image
        placeholder="blur"
        blurDataURL={`/_next/image?url=${photo.image_url}?width=100&height=100/&w=16&q=1`}
        alt="Next.js Conf photo"
        className="transform transition will-change-auto object-cover h-full flex-grow "
        style={{ transform: "translate3d(0, 0, 0)" }}
        src={photo.image_url}
        width={1000}
        height={1000}
      />
      {photo.title !== "" && photo.title !== null && (
        <p className=" text-black px-4 py-5 rounded-lg">{photo.title}</p>
      )}
    </div>
  );
}
