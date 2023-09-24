import React, { useState, useEffect } from "react";
import { UploadImageModal } from "../components/Modals/UploadImageModal";
import { useHttp } from "../hooks/useHttp";
import { BACKEND_URL } from "../consts";
import { Image } from "../shema";
import { ImageCard } from "../components/Cards/ImageCard";
import { useFormatDate } from "../hooks/useFormatDate";
import { groupImagesByDate } from "../utils/groupImagesByDate";
import { Carousel } from "react-responsive-carousel";
import { InitialPageLoading } from "../components/InitialPageLoading";
import { AnimatePresence, motion } from "framer-motion";
import { NoImagesModal } from "../components/Modals/NoImagesModal";
import { useImagesContext } from "../providers/ImagesProvider";

export type GroupedImagesList = {
  date: string;
  images: Image[];
};

type Props = {
  isUploadModalOpened: boolean;
  setIsUploadModalOpened: (bool: boolean) => void;
};

export const InitialPage = ({
  setIsUploadModalOpened,
  isUploadModalOpened,
}: Props) => {
  const { request, loading, error } = useHttp();
  const [imageList, setImageList] = useState<GroupedImagesList[]>([]);
  const { imagesQuantity, setImagesQuantity } = useImagesContext();

  const fetchAllImages = async () => {
    const fetchedImages = await request(`http://localhost:5000/images`);
    console.log("FETCHED IMAGES: ", fetchedImages);
    const groupedImages = groupImagesByDate(fetchedImages);
    console.log(groupedImages);
    setImageList(groupedImages);
    setImagesQuantity(fetchedImages.length);
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
        {loading ? (
          <InitialPageLoading />
        ) : imageList.length !== 0 ? (
          imageList.map((list: GroupedImagesList) => (
            <div className="mb-[5px]">
              <p className="text-graye text-3xl">{list.date}</p>
              <div className="flex flex-wrap mt-7">
                {list.images.length !== 0 &&
                  list.images.map((image) => (
                    <p>
                      <div className="mr-4 mb-7">
                        <ImageCard
                          image={image}
                          fetchAllImages={fetchAllImages}
                        />
                      </div>
                    </p>
                  ))}
              </div>
            </div>
          ))
        ) : (
          <NoImagesModal
            fetchAllImages={fetchAllImages}
            setIsUploadModalOpened={setIsUploadModalOpened}
          />
        )}
      </div>
      {/* {isUploadModalOpened && (
        <UploadImageModal setIsUploadModalOpened={setIsUploadModalOpened} />
      )} */}

      <AnimatePresence mode="wait">
        {isUploadModalOpened && (
          <motion.div
            style={{ zIndex: 50 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3 } }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            <UploadImageModal
              setIsUploadModalOpened={setIsUploadModalOpened}
              fetchAllImages={fetchAllImages}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
