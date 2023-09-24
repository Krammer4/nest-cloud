import React from "react";
import logo from "../img/logo.png";
import { GreyButton } from "./Buttons/GreyButton";
import { UploadIcon } from "../img/icons/UploadIcon";
import { useImagesContext } from "../providers/ImagesProvider";
import { usePlural } from "../hooks/usePlural";
import { Link, useLocation } from "react-router-dom";

type Props = {
  isUploadModalOpened: boolean;
  setIsUploadModalOpened: (bool: boolean) => void;
};

export const Header = ({
  isUploadModalOpened,
  setIsUploadModalOpened,
}: Props) => {
  const { imagesQuantity, setImagesQuantity } = useImagesContext();

  const location = useLocation();

  const MakeWordPlural = () => {
    const forms = ["image", "images", "images"];
    const count = imagesQuantity;
    const pluralForm = usePlural(forms, imagesQuantity);
    return `${count} ${pluralForm}`;
  };

  return (
    <div className="p-6 border-b-graye border-solid border-b-[1px]">
      <div className="flex flex-col sm:flex-row justify-between items-center ">
        <div>
          <Link to={`/`}>
            <img src={logo} alt="logo" />
          </Link>
          {location.pathname == "/" && (
            <p className="pt-4 text-gray-500">
              {MakeWordPlural()} stored in cloud
            </p>
          )}
        </div>
        {location.pathname == "/" && (
          <div className="mt-4 sm:mt-0">
            <GreyButton
              icon={<UploadIcon />}
              text="Upload Image"
              onClick={() => setIsUploadModalOpened(true)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
