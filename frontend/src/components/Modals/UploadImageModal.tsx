import React, { useState } from "react";
import { GreenUploadIcon } from "../../img/icons/GreenUploadIcon";
import DragDrop from "../DragDrop";

export const UploadImageModal = ({
  setIsUploadModalOpened,
}: {
  setIsUploadModalOpened: (bool: boolean) => void;
}) => {
  return (
    <DragDrop
      setIsUploadModalOpened={setIsUploadModalOpened}
      children={
        <div className="fixed inset-0 bg-white bg-opacity-20 backdrop-blur flex items-center justify-center z-50 cursor-pointer">
          <div className=" p-4 rounded-lg">
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
