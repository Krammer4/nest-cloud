import React, { useState, useEffect } from "react";
import { useHttp } from "../hooks/useHttp";
import { BACKEND_URL } from "../consts";
import { useParams } from "react-router-dom";
import { Image } from "../shema";
import { CommentCard } from "../components/Cards/CommentCard";
import { GreyButton } from "../components/Buttons/GreyButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ExtraBigLoader from "../components/Skeletons/ExtraBigImageLoader";
import TextLoader from "../components/Skeletons/TextLoader";
import axios from "axios";

interface IFormInput {
  text: string;
}

const validationSchema = yup.object().shape({
  text: yup
    .string()
    .required("Type your comment")
    .max(100, "Maximum 100 symbols"),
});

export const ImagePage = () => {
  const { request, loading, error } = useHttp();
  const { id } = useParams();
  const [image, setImage] = useState<Image | null>(null);

  //   Запрос изображения
  const fetchImage = async () => {
    const fetchedImage = await request(`${BACKEND_URL}/images/${id}`);
    setImage(fetchedImage);
  };

  //   Работа с формой
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      text: "",
    },
  });

  //   Логика комментариев

  //   - Публикация комментариев
  const publishComment = async (text: string) => {
    await request(`${BACKEND_URL}/comments`, "POST", {
      text: text,
      imageId: id,
    });
    reset();
    fetchImage();
  };

  const onSubmit = ({ text }: any) => {
    publishComment(text);
  };

  //   - Удаление

  const deleteComment = async (id: number) => {
    await axios.delete(`${BACKEND_URL}/comments/${id}`);
    await fetchImage();
  };

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <div>
      <div className="text-center">
        {loading ? (
          <div className="flex justify-center">
            {" "}
            <TextLoader />
          </div>
        ) : (
          <h1 className="text-3xl font-semibold">{image?.title}</h1>
        )}
        <div className="flex justify-center">
          {loading ? (
            <div className="mt-10">
              <ExtraBigLoader />
            </div>
          ) : (
            <img
              className="h-[300px] my-autos mt-10 rounded-2xl"
              src={`${BACKEND_URL}/uploads/${image?.filename}`}
            />
          )}
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold">Publish Comment:</h2>
          <div className="flex justify-center mt-3">
            <div className="flex w-[400px] justify-between">
              <input
                {...register("text")}
                type="text"
                placeholder="Type your comment"
                className="w-[200px] sm:w-[300px] outline-none mt-4 border-b-[2px] border-solid border-b-gray500 pb-1"
              />
              <GreyButton text="Publish" onClick={handleSubmit(onSubmit)} />
            </div>
          </div>
          <p className="text-red-500 text-sm pt-4">{errors.text?.message}</p>
        </div>

        {image?.comments.length !== 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-semibold">Comments:</h2>
            {image?.comments.map((comment) => (
              <div key={comment.id} className="flex justify-center mt-6">
                <CommentCard
                  text={comment.text}
                  publishedAt={comment.publishedAt}
                  id={comment.id}
                  deleteComment={deleteComment}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
