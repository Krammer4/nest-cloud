import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useHttp } from "../hooks/useHttp";
import { generate } from "random-words";

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

  const handleChange = (file: any) => {
    setFile(file);
    console.log("FILE: ", file);
  };

  const handleUpload = async (file: any) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await request(
          `http://localhost:5000/images?title=${generate(2).join(" ")}`,
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
      />
    </div>
  );
}

export default DragDrop;
