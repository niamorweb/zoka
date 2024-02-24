import { supabase } from "@/lib/supabase";
import React, { useState, useEffect, createContext, useContext } from "react";

export const DataContext = createContext();

export function DataProvider({ children }) {
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (user) {
        const userData = await fetchUserData(user.id);
        const photoData = await fetchPhotos(user.id);
        setData({ userData, photoData });
      }
    };

    fetchData();
  }, [reload]);

  const fetchUserData = async (userId) => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId);

    return data[0];
  };

  const reloadData = () => {
    setReload(!reload);
  };

  const fetchPhotos = async (userId) => {
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

    const photoArrayUrl = [];
    galleryPhotos.map((photo, index) => {
      photoArrayUrl.push(
        `https://izcvdmliijbnyeskngqj.supabase.co/storage/v1/object/public/users_photos/${userId}/gallery/${photo.name}`
      );
    });
    const photoData = {
      gallery: photoArrayUrl || null,
      avatar: avatarPhotos || null,
      background: backgroundPhotos || null,
    };

    return photoData;
  };

  return (
    <DataContext.Provider value={{ data, setData, reloadData }}>
      {children}
    </DataContext.Provider>
  );
}
