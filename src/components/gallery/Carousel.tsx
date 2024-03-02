import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import Image from "next/image";
import useDeviceType from "@/hooks/useDeviceType";
import { useLockBody } from "@/hooks/use-lock-body";
import { Button } from "../ui/button";
import { Cross1Icon } from "@radix-ui/react-icons";

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function Carousel({
  photos,
  selectedPhoto,
  setSelectedPhoto,
}: any) {
  useLockBody();

  const paginate = (newDirection: number) => {
    const imageLength = photos.length;

    if (selectedPhoto >= imageLength - 1 && newDirection === 1) return;
    if (selectedPhoto <= 0 && newDirection === -1) return;

    setSelectedPhoto(selectedPhoto + newDirection);
  };

  return (
    <>
      <div className="flex fixed z-50 left-1/2 -translate-x-1/2 bottom-4 gap-3">
        {/* {photos.map((photo: any, index: number) => (
          <Image
            key={index}
            onClick={() => setSelectedPhoto(index)}
            className={`block h-[50px] shrink-0 w-[50px] object-cover cursor-pointer ${
              index === selectedPhoto &&
              "border-4 rounded-md mx-auto border-greenDark"
            }`}
            src={photo.image_url}
            width={50}
            height={50}
            alt=""
          />
        ))} */}
      </div>
      <Button
        onClick={() => setSelectedPhoto(null)}
        variant="outline"
        className="fixed top-6 right-2 z-50"
      >
        <Cross1Icon />
      </Button>
      <AnimatePresence initial={false}>
        <motion.div
          className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black backdrop-blur-sm bg-opacity-35 p-2 lg:p-4 z-40"
          initial={false}
          layoutId={selectedPhoto}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedPhoto(null); // Ne ferme que si le clic est sur le backdrop
            }
          }}
        >
          <motion.img
            alt="Next.js Conf photo"
            className="transform w-fit h-fit max-h-full max-w-full transition will-change-auto object-contain"
            src={photos[selectedPhoto].image_url}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
          ></motion.img>
        </motion.div>
      </AnimatePresence>
      <div className="next z-50" onClick={() => paginate(1)}>
        {"‣"}
      </div>
      <div className="prev z-50" onClick={() => paginate(-1)}>
        {"‣"}
      </div>
    </>
  );
}
