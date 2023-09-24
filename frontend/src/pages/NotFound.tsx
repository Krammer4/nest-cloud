import React from "react";
import logo from "../img/logo.png";
import { GreyButton } from "../components/Buttons/GreyButton";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="flex justify-center items-center">
      <div>
        <img className="mt-40 w-[500px]" src={logo} />
        <h1 className="text-center text-4xl font-bold pt-5">
          Page is not found =(
        </h1>
        <Link to={`/`} className="flex justify-center mt-7">
          <GreyButton text="Main page" />
        </Link>
      </div>
    </div>
  );
};
