import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useHttp } from "../hooks/useHttp";
import { generate } from "random-words";
import { BACKEND_URL } from "src/consts";

const fileTypes = ["jpg", "png", "jpeg"];

function DragDrop({
  children,
  setIsUploadModalOpened,
  fetchAllImages,
}: {
  children: any;
  setIsUploadModalOpened?: (bool: boolean) => void;
  fetchAllImages: () => void;
}) {
  const [file, setFile] = useState(null);
  const { request, loading } = useHttp();

  const handleUpload = async (files: any[]) => {
    const filesArray = Array.from(files);
    if (filesArray && filesArray.length > 0) {
      const formData = new FormData();
      filesArray.forEach((file) => formData.append("files", file));
      const titles = Array(filesArray.length)
        .fill("")
        .map(() => generate(2).join(" "));

      try {
        await request(
          `${BACKEND_URL}/images?titles=${JSON.stringify(titles)}`,
          "POST",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        fetchAllImages();
        if (setIsUploadModalOpened) setIsUploadModalOpened(false);
      } catch (error) {
        console.error("Ошибка загрузки файла:", error);
      }
    }
  };

  return (
    <div>
      <FileUploader
        children={children}
        handleChange={handleUpload}
        name="file"
        types={fileTypes}
        multiple={true}
        fileOrFiles="Array"
      />
    </div>
  );
}

export default DragDrop;
