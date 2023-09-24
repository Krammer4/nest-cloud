import React, { useState, useEffect } from "react";
import { UploadImageModal } from "../components/Modals/UploadImageModal";
import { useHttp } from "../hooks/useHttp";
import { BACKEND_URL } from "../consts";
import { Image } from "../shema";
import { ImageCard } from "../components/Cards/ImageCard";
import { useFormatDate } from "../hooks/useFormatDate";

export const InitialPage = () => {
  const { request, loading, error } = useHttp();
  const [isUploadModalOpened, setIsUploadModalOpened] = useState(false);
  const [allImages, setAllImages] = useState([]);

  const fetchAllImages = async () => {
    const fetchedImages = await request(`http://localhost:5000/images`);
    console.log("FETCHED IMAGES: ", fetchedImages);
    setAllImages(fetchedImages);
  };

  useEffect(() => {
    fetchAllImages();
  }, []);

  return (
    <div>
      <div className="flex flex-wrap">
        {allImages.length !== 0 &&
          allImages.map((image: Image) => (
            <div className="mr-4">
              <ImageCard image={image} />
            </div>
          ))}
      </div>
      {isUploadModalOpened && (
        <UploadImageModal setIsUploadModalOpened={setIsUploadModalOpened} />
      )}
    </div>
  );
};
