import React from "react";
import WideImageLoader from "./Skeletons/WideImageLoader";
import NarrowImageLoader from "./Skeletons/NarrowImageLoader";

export const InitialPageLoading = () => {
  return (
    <div>
      <div>
        <h2 className="text-graye text-3xl">Сентябрь</h2>
        <div className="flex flex-wrap mt-7">
          <div className="mr-4">
            <WideImageLoader />
          </div>
          <div className="mr-4">
            <WideImageLoader />
          </div>
          <div className="mr-4">
            <NarrowImageLoader />
          </div>
          <div className="mr-4">
            <WideImageLoader />
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-graye text-3xl">Октябрь</h2>
        <div className="flex flex-wrap mt-7">
          <div className="mr-4">
            <WideImageLoader />
          </div>
          <div className="mr-4">
            <NarrowImageLoader />
          </div>
          <div className="mr-4">
            <WideImageLoader />
          </div>
          <div className="mr-4">
            <WideImageLoader />
          </div>
        </div>
      </div>
    </div>
  );
};
