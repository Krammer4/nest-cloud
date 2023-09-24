import React from "react";
import { format, parseISO } from "date-fns";
import enUS from "date-fns/esm/locale/en-US";

export const useFormatDate = () => {
  const getWordMonth = (inputDate: string) => {
    const parsedDate = parseISO(inputDate);
    const formattedDate = format(parsedDate, "dd MMMM", { locale: enUS });

    return formattedDate;
  };

  return { getWordMonth };
};
