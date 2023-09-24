import React from "react";
import { useFormatDate } from "../../hooks/useFormatDate";

type Props = {
  text: string;
  publishedAt: Date;
  id: number;
  deleteComment: (id: number) => void;
};

export const CommentCard = ({
  text,
  publishedAt,
  id,
  deleteComment,
}: Props) => {
  const { getWordMonth } = useFormatDate();

  return (
    <div className="w-[400px] border-solid border-gray500 border-[2px] rounded-md text-left p-3">
      <p>{text.length > 50 ? `${text.slice(0, 50)}...` : text}</p>
      <div className="flex justify-between mt-4">
        <button onClick={() => deleteComment(id)} className="text-red-500">
          Delete
        </button>
        <p className="text-sm text-lime-500 text-right">
          {getWordMonth(publishedAt.toString())}
        </p>
      </div>
    </div>
  );
};
