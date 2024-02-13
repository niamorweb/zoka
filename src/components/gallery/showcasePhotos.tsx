import { useLockBody } from "@/hooks/use-lock-body";
import { Cross2Icon } from "@radix-ui/react-icons";
import { ChevronLeft, ChevronRight, CrossIcon } from "lucide-react";
import Image from "next/image";

export default function ShowcasePhotos({
  currentPhotoSelected,
  photosUrl,
  setCurrentPhotoSelected,
  setShowcaseVisible,
}: any) {
  useLockBody();

  const handleImageChange = (number: Number) => {
    if (currentPhotoSelected <= 0 && number === -1) {
      return;
    }
    if (currentPhotoSelected >= 5 && number === 1) {
      return;
    }
    setCurrentPhotoSelected(currentPhotoSelected + number);
  };

  return (
    <section className="w-screen h-screen fixed z-30 top-0 left-0 bg-black bg-opacity-15 backdrop-blur-lg  ">
      <button
        className="absolute top-10 right-10 w-14 h-14 flex justify-center items-center"
        onClick={() => setShowcaseVisible(false)}
      >
        <Cross2Icon className=" text-white w-8 h-8" />
      </button>
      <div className="h-full flex md:gap-8 items-center justify-center">
        <ChevronLeft
          className="cursor-pointer text-white w-14 h-14"
          onClick={() => handleImageChange(-1)}
        />
        {photosUrl
          .filter((_: any, index: number) => index === currentPhotoSelected)
          .map((photo: any, index: number) => (
            <Image
              key={index}
              className="max-h-[80vh] max-w-[80vw] object-contain"
              src={photo}
              alt=""
              width={1000}
              height={1000}
            />
          ))}
        <ChevronRight
          className="cursor-pointer text-white w-14 h-14"
          onClick={() => handleImageChange(1)}
        />
      </div>
    </section>
  );
}
