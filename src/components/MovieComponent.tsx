import { Movie } from "@/types";
import React from "react";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import RenderGenres from "./RenderGenres";
import { getMovieSummary } from "@/utils/helpers";

type Props = {
  movie: Movie;
  onLikePressed?: (movie: Movie) => void;
};

const MovieComponent = ({ movie, onLikePressed }: Props) => {
  return (
    <div className="w-full bg-gray-900 rounded-lg overflow-hidden relative">
      {onLikePressed && (
        <div
          className="p-2 bg-white rounded-2xl flex items-center justify-center absolute top-2 right-2"
          onClick={() => {
            onLikePressed(movie);
          }}
        >
          {movie.isLiked ? (
            <IoHeartSharp className="text-2xl text-primary  hover:opacity-90 cursor-pointer" />
          ) : (
            <IoHeartOutline className=" text-2xl text-primary  hover:opacity-90 cursor-pointer" />
          )}
        </div>
      )}

      <img src={movie.poster_image_url} alt={movie.title} className="w-full aspect-[27/40] object-cover" />

      <div className="px-2 py-2">
        <p className="text-sm font-bold">{movie.title}</p>
        <RenderGenres genres={movie.genres} />
        <p className="text-sm">{getMovieSummary(movie)}</p>
      </div>
    </div>
  );
};

export default MovieComponent;
