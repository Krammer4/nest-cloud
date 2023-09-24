import React, { useState, useEffect } from "react";
import { UploadImageModal } from "../components/Modals/UploadImageModal";
import { useHttp } from "../hooks/useHttp";
import { BACKEND_URL } from "../consts";
import { Image } from "../shema";
import { ImageCard } from "../components/Cards/ImageCard";
import { useFormatDate } from "../hooks/useFormatDate";
import { groupImagesByDate } from "../utils/groupImagesByDate";
import { Carousel } from "react-responsive-carousel";

type GroupedImagesList = {
  date: string;
  images: Image[];
};

export const InitialPage = () => {
  const { request, loading, error } = useHttp();
  const [isUploadModalOpened, setIsUploadModalOpened] = useState(false);
  const [imageList, setImageList] = useState<GroupedImagesList[]>([]);

  const fetchAllImages = async () => {
    const fetchedImages = await request(`http://localhost:5000/images`);
    console.log("FETCHED IMAGES: ", fetchedImages);
    const groupedImages = groupImagesByDate(fetchedImages);
    console.log(groupedImages);
    setImageList(groupedImages);
  };

  useEffect(() => {
    fetchAllImages();
  }, []);

  return (
    <div>
      <div className="">
        {/* {allImages.length !== 0 &&
          allImages.map((image: Image) => (
            <div className="mr-4">
              <ImageCard image={image} />
            </div>
          ))} */}
        {imageList.length !== 0 &&
          imageList.map((list: GroupedImagesList) => (
            <div className="mb-[75px]">
              <p className="text-graye text-3xl">{list.date}</p>
              <div className="flex flex-wrap mt-7">
                {list.images.length !== 0 &&
                  list.images.map((image) => (
                    <p>
                      <div className="mr-4">
                        <ImageCard image={image} />
                      </div>
                    </p>
                  ))}
              </div>
            </div>
          ))}
      </div>
      {isUploadModalOpened && (
        <UploadImageModal setIsUploadModalOpened={setIsUploadModalOpened} />
      )}
    </div>
  );
};
