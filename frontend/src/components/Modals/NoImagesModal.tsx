import React from "react";
import DragDrop from "../DragDrop";
import { GreyButton } from "../Buttons/GreyButton";
import logo from "../../img/logo.png";
import { UploadIcon } from "../../img/icons/UploadIcon";

type Props = {
  setIsUploadModalOpened: (bool: boolean) => void;
  fetchAllImages: () => void;
};

export const NoImagesModal = ({
  setIsUploadModalOpened,
  fetchAllImages,
}: Props) => {
  return (
    <DragDrop
      setIsUploadModalOpened={setIsUploadModalOpened}
      fetchAllImages={fetchAllImages}
      children={
        <div className="fixed inset-0 bg-white bg-opacity-20 backdrop-blur flex items-center justify-center z-50 cursor-pointer">
          <div className=" p-4 rounded-lg">
            <div className="text-center">
              <div className=" my-auto items-center justify-center inline-flex">
                <img className="w-[182px]" src={logo} alt="logo" />
              </div>

              <p className="mt-[60px] font-bold text-3xl">
                No images uploaded yet
              </p>
              <p className="text-gray500 mt-4 max-w-[400px] text-sm">
                Upload your first image by drag and dropping the file on the
                screen or click the button below
              </p>
              <div className="flex justify-center mt-7">
                <GreyButton icon={<UploadIcon />} text="Upload Image" />
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
};
