import React from "react";
import logo from "../img/logo.png";
import { GreyButton } from "./Buttons/GreyButton";
import { UploadIcon } from "../img/icons/UploadIcon";

type Props = {
  isUploadModalOpened: boolean;
  setIsUploadModalOpened: (bool: boolean) => void;
};

export const Header = ({
  isUploadModalOpened,
  setIsUploadModalOpened,
}: Props) => {
  return (
    <div className="p-6 border-b-graye border-solid border-b-[1px]">
      <div className="flex justify-between items-center">
        <div>
          <img src={logo} alt="logo" />
          <p className="pt-4 text-gray-500">images stored in cloud</p>
        </div>
        <GreyButton
          icon={<UploadIcon />}
          text="Upload Image"
          onClick={() => setIsUploadModalOpened(true)}
        />
      </div>
    </div>
  );
};
