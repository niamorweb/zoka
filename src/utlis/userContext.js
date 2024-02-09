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
        fetchUserData(user.id);
        fetchPhotos(user.id);
      }
    };

    fetchData();
  }, [reload]);

  const fetchUserData = async (userId) => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId);

    data && console.log(data[0]);
    data && setData(data[0]);
  };

  const reloadData = () => {
    setReload(!reload);
  };

  const fetchPhotos = async (userId) => {
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

    setData((prevData) => ({ ...prevData, photos: urls }));
  };

  return (
    <DataContext.Provider value={{ data, setData, reloadData }}>
      {children}
    </DataContext.Provider>
  );
}
