import { ChevronRight } from "lucide-react";
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

export default function ProfileSection({
  data,
  userTheme,
  inputUsername,
  setInputUsername,
  userInfos,
  username,
  inputName,
  setInputDescription,
  inputDescription,
  setInputName,
}: any) {
  return (
    <div
      className={`after:content col relative mb-5 flex flex-col items-start justify-end gap-4 overflow-hidden rounded-lg ${
        userTheme === "dark"
          ? "bg-white/10 text-white"
          : "bg-neutral-100 text-neutral-900"
      }  px-6 pb-16 pt-64  shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0`}
    >
      {data.username === username ? (
        <Input
          value={"@" + inputUsername}
          onChange={(e) => setInputUsername(e.target.value)}
          className=" mt-8 bg-transparent text-xs font-bold lowercase tracking-widest"
        />
      ) : (
        <h4 className=" mt-8 text-xs font-bold lowercase tracking-widest">
          @{userInfos.full_name}
        </h4>
      )}

      {data.username === username ? (
        <Input
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          className="text-base bg-transparent font-bold uppercase tracking-widest"
        />
      ) : (
        <h1 className="text-base font-bold uppercase tracking-widest">
          {userInfos.full_name}
        </h1>
      )}

      {data.username === username ? (
        <Textarea
          onChange={(e) => setInputDescription(e.target.value)}
          value={inputDescription}
          className={`mb-4 bg-transparent w-full overflow-hidden h-44  ${
            userTheme === "dark" ? "text-white" : "text- text-neutral-900"
          }`}
        />
      ) : (
        <p
          className={`mb-4  ${
            userTheme === "dark" ? "text-white" : "text- text-neutral-900"
          }`}
        >
          {userInfos.bio}
        </p>
      )}

      <Dialog>
        <DialogTrigger asChild>
          <Button variant={userTheme === "dark" ? "secondary" : "default"}>
            MY LINKS
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>LINKS</DialogTitle>
            <DialogDescription>Here are all my links!</DialogDescription>
          </DialogHeader>
          <Separator />
          <div className="grid">
            {userInfos.links &&
              userInfos.links.map((link: any, index: any) => (
                <a
                  key={index}
                  href="https://www.youtube.com"
                  target="_blank"
                  className="flex justify-between items-center py-3 px-2 rounded-lg hover:outline-2 hover:outline outline-neutral-600 duration-100"
                >
                  <div className="grid">
                    <span className="text-black">{link.name}</span>
                    <span className="text-neutral-500">{link.url}</span>
                  </div>
                  <ChevronRight className="text-neutral-500" />
                </a>
              ))}
          </div>
          {/* <DialogFooter>
                      <Button type="submit">Share page</Button>
                    </DialogFooter> */}
        </DialogContent>
      </Dialog>
    </div>
  );
}
