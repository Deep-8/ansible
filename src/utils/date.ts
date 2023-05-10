import { months } from "@/constants/months";

export const dateGenerator = (date: Date) => {
  const updateDate = new Date(`${date}`.replace(/-/g, "/").replace(/T.+/, ""));
  const dt = updateDate.getDate();
  const mon = updateDate.getMonth();
  const year = updateDate.getFullYear();
  const month = months[mon];
  const newDate = `${dt} ${month}, ${year}`;
  return newDate;
};

export const capitalize = (word: string) => {
  const lower = word.toLowerCase();
  return word.charAt(0).toUpperCase() + lower.slice(1);
};
