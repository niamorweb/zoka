import { ChevronRight, ImageIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { AddAvatar } from "./AddAvatar";
import { AddBackground } from "./AddBackground";
import { DataContext } from "@/utlis/userContext";

export default function ProfileSection({
  inputUsername,
  setInputUsername,
  inputName,
  setInputDescription,
  inputDescription,
  setInputName,
}: any) {
  const { data, reloadData } = useContext(DataContext);

  return (
    <div
      className={` max-h-[900px]  text-white overflow-hidden flex flex-col gap-2 relative px-4 lg:px-10 pt-12 pb-10 lg:pt-24 lg:pb-16 shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight`}
    >
      <div className="absolute -z-10 left-0 top-0 h-full w-full bg-black/30 lg:bg-transparent lg:bg-gradient-to-r lg:from-[#00000094] lg:to-[#0000000d]"></div>

      <AddBackground />
      {data && data.userData && data.userData.background ? (
        <Image
          className="absolute h-full w-full top-0 left-0 right-0 bottom-0 object-cover -z-20"
          src={`https://izcvdmliijbnyeskngqj.supabase.co/storage/v1/object/public/users_photos/${data.userData.id}/background/${data.userData.background}`}
          width={600}
          height={600}
          alt=""
        />
      ) : (
        <div className="absolute bg-[url('/images/home/noise.png')] bg-greenDark h-full w-full top-0 left-0 right-0 bottom-0 object-cover -z-10"></div>
      )}

      <div className="flex flex-col gap-3">
        <AddAvatar />

        <Input
          value={inputUsername}
          onChange={(e) => setInputUsername(e.target.value)}
          className="max-w-[300px] mt-2 bg-transparent text-xs font-bold lowercase tracking-widest"
        />

        <Input
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          className="max-w-[300px] text-base bg-transparent font-bold tracking-widest"
        />

        <Textarea
          onChange={(e) => setInputDescription(e.target.value)}
          value={inputDescription}
          className={`max-w-[500px] mb-2 bg-transparent w-full overflow-hidden h-32 `}
        />

        {data && data.userData && data.userData.links && (
          <div className="flex gap-4 items-center mt-4">
            {data.userData.links.map((link: any, index: any) => (
              <div
                key={index}
                className="inline-flex uppercase font-medium h-10 items-center rounded-full bg-black bg-opacity-20 px-4 backdrop-blur-md transition duration-700 ease-in-out hover:bg-white hover:text-black hover:duration-300"
              >
                <Image
                  className="mr-2"
                  height={16}
                  width={16}
                  src={`http://www.google.com/s2/favicons?domain=${link.url}`}
                  alt=""
                />

                <span className="">{link.name}</span>
                <ChevronRight className="w-5 h-5" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
