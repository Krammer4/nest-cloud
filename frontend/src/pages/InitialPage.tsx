import React, { useState } from "react";
import { UploadImageModal } from "../components/Modals/UploadImageModal";

export const InitialPage = () => {
  const [isUploadModalOpened, setIsUploadModalOpened] = useState(false);

  return (
    <div>
      <div>
        <button onClick={() => setIsUploadModalOpened((prev) => !prev)}>
          МОДАЛ
        </button>
      </div>
      {isUploadModalOpened && (
        <UploadImageModal setIsUploadModalOpened={setIsUploadModalOpened} />
      )}
    </div>
  );
};
