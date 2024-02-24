"use client";

import axios, { AxiosProgressEvent, CancelTokenSource } from "axios";
import {
  AudioWaveform,
  File,
  FileImage,
  FolderArchive,
  Image,
  ImageIcon,
  UploadCloud,
  Video,
  X,
} from "lucide-react";
import { useCallback, useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Input } from "../ui/input";
import ProgressBar from "../ui/progressBar";
import { ScrollArea } from "../ui/scroll-area";
import { DataContext } from "@/utlis/userContext";
interface FileUploadProgress {
  File: File;
}

enum FileTypes {
  Image = "image",
}

const ImageColor = {
  bgColor: "bg-purple-600",
  fillColor: "fill-purple-600",
};

const OtherColor = {
  bgColor: "bg-gray-400",
  fillColor: "fill-gray-400",
};

export default function ImageUpload({
  setIsDisabled,
  filesToUpload,
  setFilesToUpload,
}: any) {
  const { data, reloadData } = useContext(DataContext);

  const checkIsDisabled = useCallback(() => {
    const differenceImages =
      15 -
      (data &&
        data.photoData &&
        data.photoData.gallery &&
        data.photoData.gallery.length + filesToUpload.length);

    if (differenceImages < 0) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [
    data &&
      data.photoData &&
      data.photoData.gallery &&
      data.photoData.gallery.length,
    filesToUpload.length,
  ]);

  // Effet secondaire pour vérifier la désactivation après chaque mise à jour de filesToUpload
  useEffect(() => {
    checkIsDisabled();
  }, [filesToUpload]);

  const removeFile = (name: string) => {
    setFilesToUpload((prevUploadProgress: any) => {
      return prevUploadProgress.filter((item: any) => item.name !== name);
    });
  };

  const onDrop = (acceptedFiles: File[]) => {
    setFilesToUpload((prevFiles: any) => [...prevFiles, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <div>
        <label
          {...getRootProps()}
          className="relative flex flex-col items-center justify-center w-full py-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 "
        >
          <div className=" text-center">
            <div className=" border p-2 rounded-md max-w-min mx-auto">
              <UploadCloud size={20} />
            </div>

            <p className="mt-2 text-sm text-gray-600">
              <span className="font-semibold">Drag files</span>
            </p>
            <p className="text-xs text-gray-500">
              Click to upload files &#40;files should be under 10 MB &#41;
            </p>
          </div>
        </label>

        <Input
          {...getInputProps()}
          id="dropzone-file"
          accept="image/png, image/jpeg"
          type="file"
          className="hidden"
        />
      </div>

      {filesToUpload.length > 0 && (
        <div>
          <ScrollArea className="h-40">
            <p className="font-medium my-2 mt-6 text-muted-foreground text-sm">
              Files to upload
            </p>
            <div className="space-y-2 pr-3">
              {filesToUpload.map((fileUploadProgress: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="flex justify-between gap-2 rounded-lg overflow-hidden border border-slate-100 group"
                  >
                    <div className="flex items-center gap-4 flex-1 p-2">
                      <div className="text-white">
                        <ImageIcon className="w-6 h-6 text-black " />
                      </div>
                      <p>{fileUploadProgress.name}</p>
                    </div>
                    <button
                      onClick={() => {
                        removeFile(fileUploadProgress.name);
                      }}
                      className="bg-red-500 text-white transition-all items-center justify-center cursor-pointer px-2"
                    >
                      <X size={20} />
                    </button>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
