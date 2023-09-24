import React from "react";

type Props = {
  icon?: string | JSX.Element;
  text: string;
  onClick: (args: any) => void;
};

export const GreyButton = ({ text, icon, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center bg-graye rounded-[10px] py-4 px-4 max-w-max"
    >
      {typeof icon !== "string" ? icon : <img src={icon} />}
      <p className="ml-[10px]">{text}</p>
    </button>
  );
};
