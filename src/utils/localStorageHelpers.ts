import { Movie, MovieList } from "@/types";

const LIKED_MOVIES = "liked_movies";

export const getLikedMovies = () => {
  const liked = localStorage.getItem(LIKED_MOVIES);
  const likedMovies = liked ? JSON.parse(liked) : {};
  return likedMovies as { [key: string]: boolean };
};

export const addMovieToLiked = (movie: Movie) => {
  const liked = getLikedMovies();
  liked[movie.id] = true;
  localStorage.setItem(LIKED_MOVIES, JSON.stringify(liked));
};

export const removeMovieFromLiked = (movie: Movie) => {
  const liked = getLikedMovies();
  delete liked[movie.id];
  localStorage.setItem(LIKED_MOVIES, JSON.stringify(liked));
};

export const isMovieLiked = (movie: Movie) => {
  const liked = getLikedMovies();
  return (movie.id in liked) as boolean;
};

export const getLikedMoviesList = () => {
  return Object.keys(getLikedMovies()) as string[];
};
