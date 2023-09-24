import { BACKEND_URL } from "../consts";
import axios from "axios";

export const downloadImage = async (filename: string) => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/images/download/${filename}`,
      {
        responseType: "blob",
      }
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));

    const link = document.createElement("a");
    link.href = url;

    link.setAttribute("download", "image.jpg");

    link.click();
  } catch (error) {
    console.error("Ошибка при скачивании картинки", error);
  }
};
