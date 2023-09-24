import React, { useState } from "react";
import { Image } from "../../shema";
import { BACKEND_URL } from "../../consts";
import { useFormatDate } from "../../hooks/useFormatDate";
import { DownloadIcon } from "../../img/icons/DownloadIcon";
import axios from "axios";
import { downloadImage } from "../../utils/downloadImage";
import { LableChangeModal } from "../Modals/LableChangeModal";
import { EditIcon } from "../../img/icons/EditIcon";
import { AnimatePresence, motion } from "framer-motion";
import { DeleteIcon } from "../../img/icons/DeleteIcon";
import { useNavigate } from "react-router-dom";

type Props = {
  image: Image;
  fetchAllImages: any;
};

export const ImageCard = ({ image, fetchAllImages }: Props) => {
  const { getWordMonth } = useFormatDate();
  const navigate = useNavigate();

  const [isLableModalOpened, setIsLableModalOpened] = useState(false);

  const [isHoverable, setIsHoverable] = useState(false);

  const deleteImage = async (id: number) => {
    await axios.delete(`${BACKEND_URL}/images?id=${id}`);
    fetchAllImages();
  };

  return (
    <div
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHoverable(true)}
      onMouseLeave={() => setIsHoverable(false)}
      onClick={() => {
        if (!isLableModalOpened) navigate(`/image/${image.id}`);
      }}
    >
      <p className="bg-[#FCF6B1] p-1 max-w-max absolute -top-4 rounded-md right-3 z-20">
        {isHoverable ? image.title : getWordMonth(image.publishedAt.toString())}
      </p>
      <div className="relative h-[200px] overflow-hidden rounded-xl">
        {/* Затемняющий фон при наведении */}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
        <img
          className="h-full w-full object-cover object-center transition-opacity duration-300 max-w-[350px]"
          src={`${BACKEND_URL}/uploads/${image.filename}`}
          alt={image.title}
        />
      </div>
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute bottom-5 left-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <button
          onClick={() => downloadImage(image.filename)}
          className="flex items-center px-3 py-1 rounded-md m-1 text-[#FCF6B1]"
        >
          <div className="mr-[6px]">
            <DownloadIcon />
          </div>
          Download
        </button>
        <button
          onClick={() => setIsLableModalOpened(true)}
          className="flex items-center px-3 py-1 rounded-md m-1 text-[#FCF6B1]"
        >
          <div className="mr-[6px]">
            <EditIcon />
          </div>
          Edit
        </button>
        <button
          onClick={() => deleteImage(image.id)}
          className="flex items-center px-3 py-1 rounded-md m-1 text-[#FCF6B1]"
        >
          <div className="mr-[6px]">
            <DeleteIcon />
          </div>
          Delete
        </button>
      </div>
      {/* {isLableModalOpened && (
        <LableChangeModal
          setIsLableModalOpened={setIsLableModalOpened}
          imageId={image.id}
        />
      )} */}

      {
        <AnimatePresence mode="wait">
          {isLableModalOpened && (
            <motion.div
              style={{ zIndex: 50 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.2 } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              <LableChangeModal
                setIsLableModalOpened={setIsLableModalOpened}
                imageId={image.id}
                fetchAllImages={fetchAllImages}
              />{" "}
            </motion.div>
          )}
        </AnimatePresence>
      }
    </div>
  );
};
