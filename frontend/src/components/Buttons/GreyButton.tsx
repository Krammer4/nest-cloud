import React from "react";

type Props = {
  icon?: string | JSX.Element;
  text: string;
  onClick?: (args: any) => void;
};

export const GreyButton = ({ text, icon, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center bg-graye rounded-[10px] py-4 px-4 max-w-max"
    >
      {icon && (
        <div className="mr-[10px]">
          {typeof icon !== "string" ? icon : <img src={icon} />}
        </div>
      )}
      <p>{text}</p>
    </button>
  );
};
