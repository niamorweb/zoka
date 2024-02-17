import { useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { LogOut, Trash, User } from "lucide-react";
import { DataContext } from "@/utlis/userContext";
import { toast } from "@/components/ui/use-toast";
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

const Gallery = () => {
  const router = useRouter();
  const { username } = router.query;
  const [userInfos, setUserInfos] = useState<userInfos>();
  const [userId, setUserId] = useState<String | null>(null);
  // const [showcaseVisible, setShowcaseVisible] = useState<Boolean>(false);
  // const [currentPhotoSelected, setCurrentPhotoSelected] = useState<Number>(0);
  const [photosUrl, setPhotosUrl] = useState<Array<string>>([]);
  const [userTheme, setUserTheme] = useState<String>("dark");
  const [inputUsername, setInputUsername] = useState<string>("");
  const [inputName, setInputName] = useState<string>("");
  const [inputDescription, setInputDescription] = useState<string>("");
  const [inputTheme, setInputTheme] = useState<string>("dark");
  const { data, reloadData } = useContext(DataContext);
  const [inputLinks, setInputLinks] = useState([{ url: "", name: "" }]);

  useEffect(() => {
    if (!username) return;
    fetchUserInfos();
    fetchPhotos();
  }, [username, userId, data]);

  const fetchUserInfos = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .single();

    if (data) {
      setUserTheme(data.theme);
      setInputName(data.full_name);
      setInputDescription(data.bio);
      setInputUsername(data.username);
      setInputTheme(data.theme);
      setInputLinks(data.links);

      setUserId(data.id);
      setUserInfos(data);
    }
  };

  const fetchPhotos = async () => {
    const { data: photos, error } = await supabase.storage
      .from("users_photos")
      .list(`${userId}`);

    if (error) {
      return;
    }

    const photoArrayUrl: Array<string> = [];
    photos.map((photo) => {
      photoArrayUrl.push(
        `https://izcvdmliijbnyeskngqj.supabase.co/storage/v1/object/public/users_photos/${userId}/${photo.name}`
      );
    });
    setPhotosUrl(photoArrayUrl);
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
      reloadData();
    }
  }

  const handleChangeTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTheme = e ? "dark" : "light";
    setInputTheme(newTheme);
  };

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
      {data.username === username && (
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
                <Button variant="outline">
                  <LogOut
                    onClick={() => logout()}
                    className="mr-2 h-4 w-4 cursor-pointer"
                  />
                  <span>Log out</span>
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Nav
            updateInfos={updateInfos}
            inputLinks={inputLinks}
            setInputLinks={setInputLinks}
            handleChangeTheme={handleChangeTheme}
            inputTheme={inputTheme}
          />
        </>
      )}

      <div className={`min-w-screen min-h-screen`}>
        {userInfos && (
          <main
            className={`mx-auto w-full h-full max-w-[1960px] p-4 ${
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
                username={username}
                inputName={inputName}
                setInputDescription={setInputDescription}
                inputDescription={inputDescription}
                setInputName={setInputName}
              />
              {photosUrl.map((photo, index) => (
                <ImageDisplay
                  key={index}
                  photo={photo}
                  index={index}
                  username={username}
                  data={data}
                  deletePhoto={deletePhoto}
                  // setShowcaseVisible={setShowcaseVisible}
                  // setCurrentPhotoSelected={setCurrentPhotoSelected}
                />
              ))}
            </div>
          </main>
        )}
      </div>
      {data.username !== username && <Footer userTheme={userTheme} />}
    </>
  );
};

export default Gallery;
