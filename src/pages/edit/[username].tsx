import { useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { LogOut, Trash, User } from "lucide-react";
import { DataContext } from "@/utlis/userContext";
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
import Head from "next/head";
import axios from "axios";
import cloudinary from "cloudinary";

// cloudinary.config({
//   cloud_name: process.env.REACT_APP_CLOUD_NAME,
//   api_key: "739952797731475",
//   api_secret: process.env.REACT_APP_API_SECRET,
// });

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
  const [items, setItems] = useState<Array<any>>([]);

  useEffect(() => {
    if (data.userData) {
      setUserTheme(data.userData.theme);
      setInputName(data.userData.full_name);
      setInputDescription(data.userData.bio);
      setInputUsername(data.userData.username);
      setInputTheme(data.userData.theme);
      setInputLinks(data.userData.links);
      fetchItems();
    }
  }, [data]);

  const deletePhoto = async (url: any) => {
    const regex = /\/kuta\/users_photos\/[^\/]+\/gallery\/[^\/]+/;
    const match = url.match(regex);
    if (match) {
      const extractedPart = match[0];
      const cheminSansExtension = extractedPart.replace(/^\/(.+)\..+$/, "$1");

      try {
        const publicId = cheminSansExtension;

        const response = await axios.delete("/api/destroy-image", {
          data: { publicId },
        });
        if (response.data.success === true) {
          const { error: deleteError } = await supabase
            .from("items")
            .delete()
            .eq("image_url", url);

          reloadData();
        } else {
          toast({
            variant: "destructive",
            title: "Error deleting image",
          });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
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
      .eq("id", data.userData.id);

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
      if (inputUsername !== data.userData.username) {
        router.push(`/edit/${inputUsername}`);
      }
      reloadData();
    }
  }

  async function fetchItems() {
    try {
      const { data: dataItems, error } = await supabase
        .from("items")
        .select("*")
        .eq("user_id", data.userData.id);

      if (dataItems) setItems(dataItems);
    } catch (error) {
      return null;
    }
  }

  return (
    <>
      <Head>
        <title>Kuta - Dashboard</title>
        <meta name="description" content="Edit your kuta page." />
        <meta
          name="keywords"
          content="photos, sharing, links, social network, media, website"
        />
        <meta name="author" content="niamorweb" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {username === (data.userData && data.userData.username) ? (
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
                  inputUsername={inputUsername}
                  setInputUsername={setInputUsername}
                  inputName={inputName}
                  setInputDescription={setInputDescription}
                  inputDescription={inputDescription}
                  setInputName={setInputName}
                  updateInfos={updateInfos}
                />
                <div className="columns-1 p-2 gap-2 sm:columns-2 xl:columns-3 2xl:columns-4">
                  {items &&
                    items.map((photo: String, index: number) => (
                      <ImageDisplay
                        key={index}
                        data={data}
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
