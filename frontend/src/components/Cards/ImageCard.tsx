import React from "react";
import { Image } from "../../shema";
import { BACKEND_URL } from "../../consts";
import { useFormatDate } from "../../hooks/useFormatDate";
import { DownloadIcon } from "../../img/icons/DownloadIcon";
import axios from "axios";
import { downloadImage } from "../../utils/downloadImage";

type Props = {
  image: Image;
};

export const ImageCard = ({ image }: Props) => {
  const { getWordMonth } = useFormatDate();

  return (
    <div className="relative group">
      <p className="bg-[#FCF6B1] p-1 max-w-max absolute -top-4 rounded-md right-3 z-50">
        {getWordMonth(image.publishedAt.toString())}
      </p>
      <img
        className="h-[200px] object-cover object-center rounded-xl transition-opacity duration-300 group-hover:opacity-70 filter brightness-100 hover:brightness-70"
        src={`${BACKEND_URL}/uploads/${image.filename}`}
      />
      <div className="absolute bottom-5 left-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={() => downloadImage(image.filename)}
          className="flex items-center bg-blue-500 text-white px-3 py-1 rounded-md m-1"
        >
          <div className="mr-[6px]">
            <DownloadIcon />
          </div>
          Download
        </button>
        <button className="block bg-green-500 text-white px-3 py-1 rounded-md m-1">
          Edit
        </button>
        <button className="block bg-red-500 text-white px-3 py-1 rounded-md m-1">
          Delete
        </button>
      </div>
    </div>
  );
};
