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
    const { data: dataItems, error } = await supabase
      .from("items")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    return dataItems;
  };

  return (
    <DataContext.Provider value={{ data, setData, reloadData }}>
      {children}
    </DataContext.Provider>
  );
}
