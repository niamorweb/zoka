import { useLockBody } from "@/hooks/use-lock-body";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function ShowcasePhotos({
  currentPhotoSelected,
  userPhotos,
  setCurrentPhotoSelected,
  setShowcaseVisible,
}: any) {
  useLockBody();

  const handleImageChange = (number: Number) => {
    console.log(userPhotos.length);

    if (currentPhotoSelected <= 0 && number === -1) {
      return;
    }
    if (currentPhotoSelected >= 5 && number === 1) {
      return;
    }
    setCurrentPhotoSelected(currentPhotoSelected + number);
  };

  const handleCloseLightBox = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log("tedddsr");
    if (event.target === event.currentTarget) {
      console.log("tesr");

      setShowcaseVisible(false);
    }
  };

  return (
    <section
      onClick={(e: any) => handleCloseLightBox(e)}
      className="w-screen h-screen fixed z-30 top-0 left-0 bg-black bg-opacity-15 backdrop-blur-lg  "
    >
      <div className="h-full flex md:gap-8 items-center justify-center">
        <ChevronLeft
          className="cursor-pointer text-white w-14 h-14"
          onClick={() => handleImageChange(-1)}
        />
        {userPhotos
          .filter((_: any, index: number) => index === currentPhotoSelected)
          .map((photo: any, index: number) => (
            <Image
              key={index}
              className="max-h-[80vh] max-w-[80vw] object-contain"
              src={photo.url}
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
