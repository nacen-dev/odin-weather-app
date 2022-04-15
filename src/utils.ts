import { format } from "date-fns";

export const round = (value: number, precision: number) => {
  let multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
};

export const unixToDateTime = (unixTimeStamp: number) => {
  return new Date(unixTimeStamp * 1000);
};

export const getDay = (date: Date) => {
  return format(date, "EEEE");
};