import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link1Icon } from "@radix-ui/react-icons";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function Links({ inputLinks, setInputLinks, updateInfos }: any) {
  const handleChange = (index: any, e: any) => {
    const { name, value } = e.target;
    const newUrls = [...inputLinks];
    newUrls[index][name] = value;
    setInputLinks(newUrls);
  };

  const isValidUrl = (url: string) => {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(url);
  };

  const handleAddUrl = () => {
    const newUrl = { url: "", name: "" };
    if (Array.isArray(inputLinks) && inputLinks.length > 0) {
      setInputLinks([...inputLinks, newUrl]);
    } else {
      setInputLinks([newUrl]);
    }
  };

  const handleRemoveUrl = (index: any) => {
    const newUrls = [...inputLinks];
    newUrls.splice(index, 1);
    setInputLinks(newUrls);
  };

  const isFormValid = () => {
    if (inputLinks) {
      return inputLinks.every((link: any) => {
        return isValidUrl(link.url) && link.name.trim() !== "";
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>
          <Link1Icon className="cursor-pointer w-8 h-8" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 mt-4">
          {inputLinks &&
            inputLinks.map((url: any, index: any) => (
              <div className="flex items-end gap-3" key={index}>
                <div className="w-3/5">
                  <div>
                    <Label className={index !== 0 ? "sr-only" : ""}>URL</Label>
                    <p className={index !== 0 ? "sr-only" : ""}>
                      Add links to your page
                    </p>
                    <div>
                      <Input
                        className="w-full"
                        name="url"
                        value={url.url}
                        onChange={(e) => handleChange(index, e)}
                      />
                    </div>
                    {!isValidUrl(url.url) && (
                      <p className="text-red-500">Invalid URL</p>
                    )}
                  </div>
                </div>
                <div className="w-2/5">
                  <div>
                    <Label className={index !== 0 ? "sr-only" : ""}>Name</Label>
                    <p className={index !== 0 ? "sr-only" : ""}>
                      Add a name for the URL.
                    </p>
                    <div>
                      <Input
                        className="w-full"
                        name="name"
                        value={url.name}
                        onChange={(e) => handleChange(index, e)}
                      />
                    </div>
                    {url.name.trim() === "" && (
                      <p className="text-red-500">Name cannot be empty</p>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  className="flex items-center justify-center bg-transparent border-none"
                  onClick={() => handleRemoveUrl(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          <button
            type="button"
            className="mt-2 w-fit bg-transparent border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-800 py-1 px-3 rounded inline-flex items-center"
            onClick={handleAddUrl}
          >
            Add URL
          </button>
        </div>

        <DialogFooter>
          <Button
            type="submit"
            onClick={() => updateInfos()}
            disabled={!isFormValid()}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
