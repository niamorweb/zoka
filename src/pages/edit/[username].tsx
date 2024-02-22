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
  const { data: galleryPhotos, error: galleryError } = await supabase.storage
    .from("users_photos")
    .list(`${userId}/gallery`);

  const { data: avatarPhotos, error: avatarError } = await supabase.storage
    .from("users_photos")
    .list(`${userId}/avatar`);

  const { data: backgroundPhotos, error: backgroundError } =
    await supabase.storage.from("users_photos").list(`${userId}/background`);

  if (galleryError) {
    return [];
  }

  const photoArrayUrl: Array<string> = [];
  galleryPhotos.map((photo, index) => {
    photoArrayUrl.push(
      `https://izcvdmliijbnyeskngqj.supabase.co/storage/v1/object/public/users_photos/${userId}/gallery/${photo.name}`
    );
  });
  return {
    gallery: photoArrayUrl || [],
    avatar: avatarPhotos || [],
    background: backgroundPhotos || [],
  };
};

const Gallery = ({ userInfos, photosUrl, username }: any) => {
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
        .remove([`${data.id}/gallery/${fileName}`]);
      reloadData();
      router.reload();
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
        router.push(`/${inputUsername}`);
      }
      reloadData();
    }
  }

  return (
    <>
      {data.username === userInfos.username ? (
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
                  <DialogDescription>
                    Make changes to your profile here. Click save when
                    you&apos;re done.
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
              updateInfos={updateInfos}
            />
          </>

          <div className={`min-w-screen min-h-screen`}>
            {userInfos && (
              <main
                className={`mx-auto grid gap-5 w-full min-h-screen max-w-[1960px]`}
              >
                <ProfileSection
                  avatar={userInfos.avatar}
                  background={userInfos.background_img}
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
                  photosUrl={photosUrl}
                />
                <div className="columns-1 p-4  gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
                  {photosUrl.gallery &&
                    photosUrl.gallery.length > 0 &&
                    photosUrl.gallery.map((photo: string, index: number) => (
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
          <Footer userTheme={userTheme} />
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

  return { userInfos: data, photosUrl, username: username };
};

export default Gallery;
