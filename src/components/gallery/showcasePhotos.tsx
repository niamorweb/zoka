import { useLockBody } from "@/hooks/use-lock-body";
import { Cross2Icon, OpenInNewWindowIcon } from "@radix-ui/react-icons";
import { ChevronLeft, ChevronRight, CrossIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ShowcasePhotos({
  currentPhotoSelected,
  photosUrl,
  setCurrentPhotoSelected,
  setShowcaseVisible,
}: any) {
  useLockBody();

  const [mainPhoto, setMainPhoto] = useState(photosUrl[currentPhotoSelected]);

  const handleImageChange = (number: Number) => {
    if (currentPhotoSelected <= 0 && number === -1) {
      return;
    }
    if (photosUrl.length - 1 <= currentPhotoSelected && number === 1) {
      return;
    }
    setCurrentPhotoSelected(currentPhotoSelected + number);
    setMainPhoto(photosUrl[currentPhotoSelected + number]);
  };

  const handleImageChangeViaThumbmail = (index: Number) => {
    setCurrentPhotoSelected(index);
    setMainPhoto(photosUrl[currentPhotoSelected]);
  };

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.keyCode === 37) {
        handleImageChange(-1);
      } else if (event.keyCode === 39) {
        handleImageChange(1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleImageChange]);

  return (
    <section className="w-screen h-screen fixed z-30 top-0 left-0 bg-black bg-opacity-15 backdrop-blur-lg  ">
      <div className="absolute top-10 right-10 flex justify-center items-center gap-4">
        {" "}
        <a
          href={mainPhoto}
          target="_blank"
          className="flex items-center text-white gap-2 justify-center"
        >
          <p>Open image</p>
          <OpenInNewWindowIcon className="w-8 h-8" />
        </a>
        <button
          className="w-14 h-14 flex justify-center items-center"
          onClick={() => setShowcaseVisible(false)}
        >
          <Cross2Icon className=" text-white w-8 h-8" />
        </button>
      </div>
      <div className="h-full flex md:gap-8 items-center justify-center">
        <ChevronLeft
          className="cursor-pointer text-white w-14 h-14"
          onClick={() => handleImageChange(-1)}
        />

        <Image
          className="max-h-[70vh] max-w-[80vw] object-contain"
          src={mainPhoto + "?width=200&height=200"}
          alt=""
          width={1000}
          height={1000}
        />
        <div className="absolute bottom-4 flex items-center gap-3 overflow-auto">
          {photosUrl.map((photo: string, index: number) => (
            <Image
              onClick={() => handleImageChangeViaThumbmail(index)}
              src={photo + "?width=100&height=100"}
              className={`flex-shrink flex-grow w-[50px] h-[50px] object-cover ${
                currentPhotoSelected === index && "border-black border-2"
              }`}
              width={100}
              height={100}
              quality={10}
              alt=""
            />
          ))}
        </div>
        <ChevronRight
          className="cursor-pointer text-white w-14 h-14"
          onClick={() => handleImageChange(1)}
        />
      </div>
    </section>
  );
}
