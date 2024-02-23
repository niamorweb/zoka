import { useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { LogOut, Trash, User } from "lucide-react";
import { DataContext } from "@/utlis/userContext";
// import { toast } from "@/components/ui/use-toast";
import Nav from "@/components/gallery/Nav";
import ProfileSection from "@/components/gallery/ProfileSection";
import Footer from "@/components/gallery/Footer";
import ImageDisplay from "@/components/gallery/ImageDisplay";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";

interface link {
  name: String;
  url: String;
}

interface photosUrl {
  gallery: Array<String> | null;
  avatar: Array<any> | null;
  background: Array<any> | null;
}

const Gallery = () => {
  const router = useRouter();
  const { username } = router.query;
  const { data, reloadData } = useContext(DataContext);
  const [userTheme, setUserTheme] = useState<String>("dark");
  const [inputUsername, setInputUsername] = useState<string>("");
  const [inputName, setInputName] = useState<string>("");
  const [inputDescription, setInputDescription] = useState<string>("");
  const [inputTheme, setInputTheme] = useState<string>("dark");
  const [inputLinks, setInputLinks] = useState([{ url: "", name: "" }]);
  const [userInfos, setUserInfos] = useState([]);
  const [photosUrl, setPhotosUrl] = useState<photosUrl>({
    gallery: null,
    avatar: null,
    background: null,
  });

  useEffect(() => {
    fetchPhotos();
    setUserTheme(data.theme);
    setInputName(data.full_name);
    setInputDescription(data.bio);
    setInputUsername(data.username);
    setInputTheme(data.theme);
    setInputLinks(data.links);
  }, [data]);

  const fetchPhotos = async () => {
    const { data: galleryPhotos, error: galleryError } = await supabase.storage
      .from("users_photos")
      .list(`${data.id}/gallery`);

    const { data: avatarPhotos, error: avatarError } = await supabase.storage
      .from("users_photos")
      .list(`${data.id}/avatar`);

    const { data: backgroundPhotos, error: backgroundError } =
      await supabase.storage.from("users_photos").list(`${data.id}/background`);

    if (galleryError) {
      return [];
    }

    const photoArrayUrl: Array<String> = [];
    galleryPhotos.map((photo, index) => {
      photoArrayUrl.push(
        `https://izcvdmliijbnyeskngqj.supabase.co/storage/v1/object/public/users_photos/${data.id}/gallery/${photo.name}`
      );
    });
    const photoData = {
      gallery: photoArrayUrl || null,
      avatar: avatarPhotos || null,
      background: backgroundPhotos || null,
    };

    setPhotosUrl(photoData);
  };

  const deletePhoto = async (photoName: string) => {
    const regex = /\/([^/]+\.jpg)$/i;
    const match = photoName.match(regex);
    if (match) {
      const fileName = match[1];

      const { data: userData, error } = await supabase.storage
        .from("users_photos")
        .remove([`${data.id}/gallery/${fileName}`]);
      reloadData();
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
    } else {
      router.push("/s/signin");
    }
  };

  async function updateInfos() {
    const { data: userData, error } = await supabase
      .from("users")
      .update({
        username: inputUsername,
        full_name: inputName,
        bio: inputDescription,
        theme: inputTheme,
        links: inputLinks,
      })
      .eq("id", data.id);

    if (error) {
      if (error.code === "23505") {
        toast({
          variant: "destructive",
          title: "Username already used",
          description: "Please change your username",
        });
      } else {
        toast({
          variant: "destructive",
          title: "An error has occurred",
        });
      }
    } else {
      toast({
        description: "Profile updated !",
      });
      if (inputUsername !== data.username) {
        router.push(`/edit/${inputUsername}`);
      }
      reloadData();
    }
  }

  return (
    <>
      {data.username === data.username ? (
        <>
          <Toaster />
          <>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="fixed z-40 left-10 rounded-xl top-10 md:top-auto md:bottom-10 "
                  variant="outline"
                >
                  <User />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>My account</DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <Button onClick={() => logout()} variant="outline">
                    <LogOut className="mr-2 h-4 w-4 cursor-pointer" />
                    <span>Log out</span>
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Nav
              data={data}
              inputLinks={inputLinks}
              setInputLinks={setInputLinks}
              updateInfos={updateInfos}
            />
          </>

          <div className={`min-w-screen min-h-screen`}>
            {data && (
              <main
                className={`mx-auto grid gap-5 w-full min-h-screen max-w-[1960px]`}
              >
                <ProfileSection
                  data={data}
                  inputUsername={inputUsername}
                  setInputUsername={setInputUsername}
                  userInfos={userInfos}
                  inputName={inputName}
                  setInputDescription={setInputDescription}
                  inputDescription={inputDescription}
                  setInputName={setInputName}
                  photosUrl={photosUrl}
                />
                <div className="columns-1 p-4  gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
                  {photosUrl &&
                    photosUrl.gallery &&
                    photosUrl.gallery.length > 0 &&
                    photosUrl.gallery.map((photo: String, index: number) => (
                      <ImageDisplay
                        key={index}
                        photo={photo}
                        index={index}
                        deletePhoto={deletePhoto}
                      />
                    ))}
                </div>
              </main>
            )}
          </div>
          <Footer />
        </>
      ) : (
        <div className="h-screen flex flex-col gap-3 items-center justify-center">
          <p className="text-lg lg:text-xl">Unauthorised access</p>
          <Link className="underline underline-offset-2 " href={`/${username}`}>
            Go to user's page
          </Link>
        </div>
      )}
    </>
  );
};

export default Gallery;
