import React from "react";
import { Image } from "../../shema";
import { BACKEND_URL } from "../../consts";
import { useFormatDate } from "../../hooks/useFormatDate";

type Props = {
  image: Image;
};

export const ImageCard = ({ image }: Props) => {
  const { getWordMonth } = useFormatDate();

  return (
    <div className="relative">
      <p className="bg-[#FCF6B1] p-1 max-w-max absolute -top-4 rounded-md right-3">
        {getWordMonth(image.publishedAt.toString())}
      </p>
      <img
        className="h-[200px] object-cover object-center rounded-xl"
        src={`${BACKEND_URL}/uploads/${image.filename}`}
      />
    </div>
  );
};
