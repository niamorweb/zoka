import { supabase } from "@/lib/supabase";
import { Label } from "@radix-ui/react-label";
import * as React from "react";
import { uid } from "uid";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AppearanceForm() {
  const [image, setImage] = React.useState<File | null>(null);
  const [userId, setUserId] = React.useState<string | null>(null);
  const [userPhotos, setUserPhotos] = React.useState<
    { name: string; url: string }[]
  >([]);

  React.useEffect(() => {
    getUserId();
  }, []);

  React.useEffect(() => {
    fetchPhotos();
  }, [userId]);

  const getUserId = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    user && setUserId(user.id);
  };

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!userId) {
      return;
    }

    const fileName = image?.name;

    const re = /(?:\.([^.]+))?$/;

    if (fileName) {
      const match = re.exec(fileName);
      const fileExtension: String | null = match && match[1];

      const uniq_id: string = uid();

      if (image) {
        const { data: uploadData, error } = await supabase.storage
          .from(`users_photos/${userId}`)
          .upload(`${userId}_${Date.now()}_${uniq_id}.${fileExtension}`, image);

        if (error) {
          return null;
        } else {
          fetchPhotos();
        }
      }
    }
  };

  const fetchPhotos = async () => {
    if (userId) {
      const { data, error } = await supabase.storage
        .from("users_photos")
        .list(`${userId}`);
      if (error) {
        return;
      }

      const urlsPromises = data.map(async (file) => {
        const url = await supabase.storage
          .from("users_photos")
          .getPublicUrl(`${userId}/${file.name}`);
        return { name: file.name, url: url.data.publicUrl };
      });

      const urls = await Promise.all(urlsPromises);

      setUserPhotos(urls);
    }
  };

  const deletePhoto = async (photoName: string) => {
    const { error } = await supabase.storage
      .from("users_photos")
      .remove([`${userId}/${photoName}`]); // Assurez-vous de spécifier le chemin complet de la photo
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImage(e.target.files[0]);
  };

  return (
    <>
      <form onSubmit={onSubmit} className="space-y-8">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="picture">Picture</Label>
          <Input onChange={handleImageChange} id="picture" type="file" />
        </div>
        <Button type="submit">Add this photo(s)</Button>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {userPhotos &&
          userPhotos.length > 0 &&
          userPhotos.map((photo, index) => (
            <div key={index} className="flex flex-col gap-1 items-center">
              <Image
                onClick={() => deletePhoto(photo.name)}
                width={300}
                height={300}
                src={photo.url}
                alt="image"
                className="h-[200px] w-[200px] object-cover"
              />
              <Button variant="ghost">Delete</Button>
            </div>
          ))}
      </div>
    </>
  );
}
