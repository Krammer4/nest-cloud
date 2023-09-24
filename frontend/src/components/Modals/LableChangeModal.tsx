import React, { useState, useEffect } from "react";
import { useHttp } from "../../hooks/useHttp";
import { BACKEND_URL } from "../../consts";
import { Image } from "../../shema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { GreyButton } from "../Buttons/GreyButton";
import { CheckIcon } from "../../img/icons/CheckIcon";
import axios from "axios";
import { CrossIcon } from "../../img/icons/CrossIcon";
import WideImageLoader from "../Skeletons/WideImageLoader";

interface IFormInput {
  lable: string;
}

const validationSchema = yup.object().shape({
  lable: yup
    .string()
    .required("Enter a new label")
    .max(100, "Maximum 100 symbols"),
});

type Props = {
  setIsLableModalOpened: (bool: boolean) => void;
  imageId: number;
  fetchAllImages: any;
};

export const LableChangeModal = ({
  setIsLableModalOpened,
  imageId,
  fetchAllImages,
}: Props) => {
  const { request, loading, error } = useHttp();

  const [image, setImage] = useState<Image | null>(null);

  //   Работа с формой
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      lable: "",
    },
  });

  const onSubmit = ({ lable }: any) => {
    changeImageLable(lable);
  };

  //   Логика смены названия картинки

  const changeImageLable = async (newTitle: string) => {
    try {
      const changeInfo = await axios.patch(
        `${BACKEND_URL}/images?id=${imageId}&title=${newTitle}`
      );
      fetchAllImages();
      setIsLableModalOpened(false);
    } catch (error) {
      console.error("Произошла ошибка при отправке запроса на сервер:", error);
    }
  };

  //   Запрос одной картинки

  const fetchImage = async () => {
    const fetchedImage = await request(`${BACKEND_URL}/images/${imageId}`);
    setImage(fetchedImage);
  };

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <div className="fixed inset-0 bg-white bg-opacity-80 backdrop-blur flex items-center justify-center z-50">
      <div className=" p-4 rounded-lg">
        <div className="text-right">
          <button className="text-gray-400 hover:text-gray-700 absolute right-12 top-12">
            <GreyButton
              icon={<CrossIcon />}
              text="Close editor"
              onClick={() => setIsLableModalOpened(false)}
            />
          </button>
        </div>
        <div className="text-center">
          <p className="mt-4 font-bold text-3xl">Set custom lable</p>
          {loading ? (
            <div className="mt-[53px]">
              {" "}
              <WideImageLoader />
            </div>
          ) : (
            <img
              className="h-[200px] rounded-2xl mt-[53px]"
              src={`${BACKEND_URL}/uploads/${image?.filename}`}
            />
          )}
          <input
            {...register("lable")}
            type="text"
            className="text-center outline-none text-[#3D293F] text-lg mt-5"
            placeholder={image?.title}
          />
          <p className="form-validation-error text-xs text-red-400 mt-2">
            {errors?.lable?.message}
          </p>
          <p className="text-xs text-gray500 mt-3">100 chars max</p>{" "}
          <div className="flex justify-center mt-10">
            <button onClick={handleSubmit(onSubmit)}>
              <GreyButton
                icon={<CheckIcon />}
                onClick={() => handleSubmit(onSubmit)}
                text="Save"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
