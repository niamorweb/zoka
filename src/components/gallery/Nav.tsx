import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Links from "@/components/gallery/Links";
import { AddPhoto } from "./AddPhoto";
import { ALargeSmall, BoxIcon } from "lucide-react";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { toast } from "../ui/use-toast";
import Link from "next/link";
import Appearance from "./Appearance";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

interface category {
  title: string;
  description: string;
}

export default function Nav({
  data,
  updateInfos,
  inputLinks,
  setInputLinks,
  photosUrl,
}: any) {
  const [listCategories, setListCategories] = useState<category[]>([]);
  const handleCopyPage = () => {
    navigator.clipboard.writeText("kuta.vercel.app/" + data.username);
    toast({
      title: "Link copied !",
    });
  };

  const handleUpdateTextSection = async (value: boolean) => {
    const { data: userData, error } = await supabase
      .from("users")
      .update({
        is_text_section: value,
      })
      .eq("id", data.userData.id);

    updateInfos();
  };

  return (
    <nav className="fixed z-40 left-1/2 rounded-[40px] bg-greenDark text-greenLight -translate-x-1/2 bottom-10 flex items-center gap-6 px-6 py-4">
      {/* <button
        onClick={() => handleCopyPage()}
        className="bg-greenLight border-2 border-greenLight text-greenDark px-5 py-2 rounded-3xl duration-150 hover:scale-105"
      >
        Share my page
      </button> */}
      <button
        onClick={() => updateInfos()}
        className="bg-greenLight border-2 border-greenLight text-greenDark px-5 py-2 rounded-3xl duration-150 hover:scale-105"
      >
        Update
      </button>
      <Links
        updateInfos={updateInfos}
        inputLinks={inputLinks}
        setInputLinks={setInputLinks}
      />
      <AddPhoto updateInfos={updateInfos} />
      {/* <Popover>
        <PopoverTrigger asChild>
          <button>
            <BoxIcon className="w-6 h-6" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-fit mb-4">
          <div className="grid gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                onCheckedChange={handleChangeTheme}
                defaultChecked={inputTheme === "dark"}
                id="theme-mode"
              />
              <Label htmlFor="theme-mode">Dark Theme</Label>
            </div>
          </div>
        </PopoverContent>
      </Popover> */}
      {data && data.userData && data.userData.is_text_section ? (
        <ALargeSmall
          className="border-b-2 border-greenLight hover:scale-105 duration-150 cursor-pointer "
          onClick={() => handleUpdateTextSection(false)}
        />
      ) : (
        <ALargeSmall
          className=" hover:scale-105 duration-150 cursor-pointer"
          onClick={() => handleUpdateTextSection(true)}
        />
      )}
      <Link
        href={`/${data.userData && data.userData.username}`}
        target="_blank"
        className="border-2 border-greenLight px-5 py-2 rounded-3xl duration-150 hover:scale-105"
      >
        Preview
      </Link>
    </nav>
  );
}
