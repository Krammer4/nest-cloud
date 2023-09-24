import React, { useState, useEffect } from "react";
import { UploadImageModal } from "../components/Modals/UploadImageModal";
import { useHttp } from "../hooks/useHttp";
import { Image } from "../shema";
import { ImageCard } from "../components/Cards/ImageCard";
import { groupImagesByDate } from "../utils/groupImagesByDate";
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
  const { request, loading } = useHttp();
  const [imageList, setImageList] = useState<GroupedImagesList[]>([]);
  const { imagesQuantity, setImagesQuantity } = useImagesContext();

  const fetchAllImages = async () => {
    const fetchedImages = await request(`http://localhost:5000/images`);
    const groupedImages = groupImagesByDate(fetchedImages);
    setImageList(groupedImages);
    setImagesQuantity(fetchedImages.length);
  };

  useEffect(() => {
    fetchAllImages();
  }, []);

  return (
    <div>
      <div className="">
        {loading ? (
          <InitialPageLoading />
        ) : imageList.length !== 0 ? (
          imageList.map((list: GroupedImagesList) => (
            <div key={list.date} className="mb-[5px]">
              <p className="text-graye text-3xl">{list.date}</p>
              <div className="flex flex-wrap mt-7">
                {list.images.length !== 0 &&
                  list.images.map((image) => (
                    <div key={image.id} className="mr-4 mb-7">
                      <ImageCard
                        image={image}
                        fetchAllImages={fetchAllImages}
                      />
                    </div>
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
