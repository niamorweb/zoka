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

interface link {
  name: String;
  url: String;
}
interface userInfos {
  bio: String | null;
  created_at: String;
  email: String | null;
  full_name: String | null;
  language: String | null;
  links: Array<link> | null;
  theme: String;
  user_id: String;
  username: String;
}

const fetchPhotos = async (userId: string) => {
  const { data: photos, error } = await supabase.storage
    .from("users_photos")
    .list(`${userId}`);

  if (error) {
    return [];
  }

  const photoArrayUrl: Array<string> = [];
  photos.forEach((photo) => {
    photoArrayUrl.push(
      `https://izcvdmliijbnyeskngqj.supabase.co/storage/v1/object/public/users_photos/${userId}/${photo.name}`
    );
  });
  return photoArrayUrl;
};

const Gallery = ({ userInfos, photosUrl }: any) => {
  const router = useRouter();
  const { data, reloadData } = useContext(DataContext);
  const [userTheme, setUserTheme] = useState<String>("dark");
  const [inputUsername, setInputUsername] = useState<string>("");
  const [inputName, setInputName] = useState<string>("");
  const [inputDescription, setInputDescription] = useState<string>("");
  const [inputTheme, setInputTheme] = useState<string>("dark");
  const [inputLinks, setInputLinks] = useState([{ url: "", name: "" }]);

  useEffect(() => {
    setUserTheme(userInfos.theme);
    setInputName(userInfos.full_name);
    setInputDescription(userInfos.bio);
    setInputUsername(userInfos.username);
    setInputTheme(userInfos.theme);
    setInputLinks(userInfos.links);
  }, [userInfos]);

  const deletePhoto = async (photoName: string) => {
    const regex = /\/([^/]+\.jpg)$/i;
    const match = photoName.match(regex);
    if (match) {
      const fileName = match[1];
      const { data: userData, error } = await supabase.storage
        .from("users_photos")
        .remove([`${data.id}/${fileName}`]);
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

  return (
    <>
      <Toaster />
      {data.username === userInfos.username && (
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
                <DialogDescription>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
                </DialogDescription>
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
            inputTheme={inputTheme}
          />
        </>
      )}

      <div className={`min-w-screen min-h-screen`}>
        {userInfos && (
          <main
            className={`mx-auto w-full min-h-screen max-w-[1960px] p-4 ${
              userTheme === "dark" ? "bg-black" : "bg-white"
            }`}
          >
            <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
              <ProfileSection
                data={data}
                userTheme={userTheme}
                inputUsername={inputUsername}
                setInputUsername={setInputUsername}
                userInfos={userInfos}
                username={userInfos.username}
                inputName={inputName}
                setInputDescription={setInputDescription}
                inputDescription={inputDescription}
                setInputName={setInputName}
              />
              {photosUrl &&
                photosUrl.length > 0 &&
                photosUrl.map((photo: string, index: number) => (
                  <ImageDisplay
                    key={index}
                    photo={photo}
                    index={index}
                    username={userInfos.username}
                    data={data}
                    deletePhoto={deletePhoto}
                  />
                ))}
            </div>
          </main>
        )}
      </div>
      {data.username !== userInfos.username && <Footer userTheme={userTheme} />}
    </>
  );
};

Gallery.getInitialProps = async ({ query }: any) => {
  const { username } = query;
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", username)
    .single();

  if (error) {
    console.error("Error fetching user data:", error.message);
    return { userInfos: null, photosUrl: [] };
  }

  const photosUrl = data ? await fetchPhotos(data.id) : [];

  return { userInfos: data, photosUrl };
};

export default Gallery;
