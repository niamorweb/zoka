import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BoxIcon, ImageIcon } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function Appearance() {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <BoxIcon className="w-6 h-6" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Appearance</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <Label htmlFor="title">Theme</Label>
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="title">Round images borders</Label>
          </div>
          <DialogFooter>
            <Button type="submit">Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
