import { Movie } from "@/types";
import { getMovieSummary } from "@/utils/helpers";
import React from "react";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";

const HomeBanner = ({ movie, onLikePressed }: { movie: Movie; onLikePressed: (movie: Movie) => void }) => {
  return (
    <div className="w-full aspect-[3/1.5] md:aspect-[4/2] lg:aspect-[4/1.5] flex flex-col justify-end relative p-4 rounded-lg overflow-hidden">
      <img
        src={movie.banner_image_url}
        className="w-full h-full absolute object-cover  top-0 right-0 z-[-100] opacity-70"
      />

      <h1 className="text-2xl md:text-4xl">{movie.title}</h1>

      <p className="text-sm md:text-lg mb-1 md:mb-3">{getMovieSummary(movie)}</p>

      <div className="flex gap-3 ">
        <div className="my-button">Watch now</div>

        <div
          className="p-2 bg-white rounded-2xl flex items-center justify-center "
          onClick={() => {
            onLikePressed(movie);
          }}
        >
          {movie.isLiked ? (
            <IoHeartSharp className="text-3xl text-primary  hover:opacity-90 cursor-pointer" />
          ) : (
            <IoHeartOutline className=" text-3xl text-primary  hover:opacity-90 cursor-pointer" />
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
