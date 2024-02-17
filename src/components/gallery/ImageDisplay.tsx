import Image from "next/image";
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
import { useState } from "react";

export default function ImageDisplay({
  photo,
  index,
  username,
  data,
  deletePhoto,
  setShowcaseVisible,
  setCurrentPhotoSelected,
}: any) {
  const [activePhoto, setActivePhoto] = useState<string>("");

  return (
    <div key={index}>
      {data.username === username ? (
        <div
          key={index}
          className="after:content group relative mb-5 block w-full after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
        >
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <div className="absolute top-3 right-3 z-30">
                <Button variant="outline">
                  <Trash />
                </Button>
              </div>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this photo ?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deletePhoto(photo)}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Image
            placeholder="blur"
            blurDataURL={`/_next/image?url=${photo}&w=16&q=1`}
            alt="Next.js Conf photo"
            className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
            style={{ transform: "translate3d(0, 0, 0)" }}
            src={photo + "?width=500&height=600"}
            width={720}
            height={480}
            quality={50}
            sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
          />
        </div>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <div
              onClick={() => setActivePhoto(photo)}
              key={index}
              className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
            >
              <Image
                placeholder="blur"
                blurDataURL={`/_next/image?url=${photo}&w=16&q=1`}
                alt="Next.js Conf photo"
                className="transform mb-5 rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                style={{ transform: "translate3d(0, 0, 0)" }}
                src={photo + "?width=500&height=600"}
                width={720}
                height={480}
                quality={50}
                sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
              />
            </div>
          </DialogTrigger>
          <DialogContent className="p-0">
            <Image
              placeholder="blur"
              blurDataURL={`/_next/image?url=${activePhoto}&w=16&q=1`}
              alt="Next.js Conf photo"
              className="transform object-contain rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
              style={{ transform: "translate3d(0, 0, 0)" }}
              src={activePhoto}
              width={1000}
              height={1000}
              sizes="(max-width: 1200px) 100vw,
                  (max-width: 1880px) 50vw,
                  (max-width: 2200px) 33vw,
                  25vw"
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
