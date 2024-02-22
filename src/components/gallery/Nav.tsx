import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Links from "@/components/gallery/Links";
import { AddPhoto } from "./AddPhoto";
import { BoxIcon } from "lucide-react";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { toast } from "../ui/use-toast";
import Link from "next/link";

export default function Nav({
  data,
  updateInfos,
  inputLinks,
  setInputLinks,
  handleChangeTheme,
  inputTheme,
}: any) {
  const handleCopyPage = () => {
    navigator.clipboard.writeText("kuta.vercel.app/" + data.username);
    toast({
      title: "Link copied !",
    });
  };

  return (
    <nav className="fixed z-40 left-1/2 bg-slate-800 bg-opacity-25 backdrop-blur-xl text-white rounded-xl -translate-x-1/2 bottom-10 flex items-center gap-4 p-2">
      <button
        onClick={() => handleCopyPage()}
        className="bg-blue-500 hidden md:flex mr-4 px-5 py-2 rounded-lg font-medium"
      >
        Share my page
      </button>
      <Links
        updateInfos={updateInfos}
        inputLinks={inputLinks}
        setInputLinks={setInputLinks}
      />
      <button>
        <AddPhoto />
      </button>
      <Popover>
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
      </Popover>
      <button
        onClick={() => updateInfos()}
        className="bg-white ml-4 text-black px-5 py-2 rounded-lg font-medium"
      >
        Update
      </button>
      <Link
        href={`/t/${data.username}`}
        target="_blank"
        className="bg-white text-black px-5 py-2 rounded-lg font-medium"
      >
        Preview
      </Link>
    </nav>
  );
}
