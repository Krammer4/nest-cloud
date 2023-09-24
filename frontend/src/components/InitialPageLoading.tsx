import React from "react";
import WideImageLoader from "./Skeletons/WideImageLoader";
import NarrowImageLoader from "./Skeletons/NarrowImageLoader";
import TextLoader from "./Skeletons/TextLoader";

export const InitialPageLoading = () => {
  return (
    <div>
      <div>
        <TextLoader />
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
        <TextLoader />
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
