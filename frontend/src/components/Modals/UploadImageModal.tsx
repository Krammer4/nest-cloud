import React from "react";
import { GreenUploadIcon } from "../../img/icons/GreenUploadIcon";
import DragDrop from "../DragDrop";
import { GreyButton } from "../Buttons/GreyButton";
import { CrossIcon } from "../../img/icons/CrossIcon";

type Props = {
  setIsUploadModalOpened: (bool: boolean) => void;
  fetchAllImages: () => void;
};

export const UploadImageModal = ({
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
            <div className="text-right">
              <button className="text-gray-400 hover:text-gray-700 absolute right-12 top-12">
                <GreyButton
                  icon={<CrossIcon />}
                  text="Close editor"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsUploadModalOpened(false);
                  }}
                />
              </button>
            </div>
            <div className="text-center">
              <div className="w-[80px] my-auto items-center justify-center inline-flex">
                <GreenUploadIcon />
              </div>

              <p className="mt-4 font-bold text-3xl">Upload file</p>
              <p className="text-gray500 mt-4">
                Drop your file here to start uploading
              </p>
            </div>
          </div>
        </div>
      }
    />
  );
};
