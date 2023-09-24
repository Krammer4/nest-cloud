import enUS from "date-fns/locale/en-US";
import { Image } from "../shema";
import { format, parseISO } from "date-fns";

export interface GroupedImages {
  [formattedDate: string]: Image[];
}

export const groupImagesByDate = (imagesData: Image[]) => {
  const groupedImages: GroupedImages = {};

  imagesData.forEach((image) => {
    const date = parseISO(image.publishedAt.toString());
    const formattedDate = format(date, "dd MMMM", { locale: enUS });

    if (!groupedImages[formattedDate]) {
      groupedImages[formattedDate] = [];
    }

    groupedImages[formattedDate].push(image);
  });

  const transformedImages = Object.entries(groupedImages).map(
    ([date, images]) => ({
      date,
      images,
    })
  );
  return transformedImages;
};
