import constants from "@/constants/constants";
import { Movie } from "@/types";
import { getCookie } from "cookies-next";

export const getMovieSummary = (movie: Movie) => {
  const yearOfRelease = new Date(movie.release_date).getFullYear();
  return `${yearOfRelease} | ${minsToHoursString(movie.duration)} | ⭐️ ${movie.rating}/10`;
};

export const minsToHoursString = (mins: number) => {
  const hours = Math.floor(mins / 60);
  const minutes = mins % 60;

  let finalStr = "";

  if (hours > 0) {
    finalStr += `${hours}h `;
  }

  if (minutes > 0) {
    finalStr += `${minutes}m`;
  }

  return finalStr;
};

export const getAdminApiKey = () => {
  return getCookie(constants.ADMIN_API_KEY) || "";
};
