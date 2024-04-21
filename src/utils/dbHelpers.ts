import { GenreList, Movie, MovieList } from "@/types";
import supabase from "./supabase";
import { createClient } from "@supabase/supabase-js";
import constants from "@/constants/constants";

export const getGenreFromDB = async () => {
  const result = {
    data: [],
    error: null,
  } as {
    data: GenreList;
    error: null | string;
  };

  const { data, error } = await supabase.from("genres").select("*");

  if (error) {
    result.error = error.message;
  } else {
    result.data = data;
  }

  return result;
};

// movie db functions

// private
// post
export const uploadMovieToDB = async (movie: Movie, apiKey: string) => {
  const result = {
    data: [],
    error: null,
  } as any;

  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, apiKey);

    const { data, error } = await supabase.rpc("upload_movie", {
      p_banner_image_url: movie.banner_image_url,
      p_description: movie.description,
      p_download_url: movie.download_url,
      p_duration: movie.duration,
      p_genres: movie.genres,
      p_poster_image_url: movie.poster_image_url,
      p_rating: movie.rating,
      p_release_date: movie.release_date,
      p_title: movie.title,
      p_trailer_url: movie.trailer_url,
      p_watch_url: movie.watch_url,
    });

    if (error) {
      result.error = error.message;
      return result;
    }

    result.data = "Movie uploaded successfully";
  } catch (e: any) {
    result.error = e.message;
  }

  return result;
};

// delete
export const deleteMovieToDBById = async (movie: Movie, apiKey: string) => {
  const result = {
    data: [],
    error: null,
  } as any;

  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, apiKey);

    const { data, error } = await supabase.rpc("delete_movie_by_id", {
      p_movie_id: movie.id,
    });

    if (error) {
      result.error = error.message;
      return result;
    }

    result.data = "Movie deleted successfully";
  } catch (e: any) {
    result.error = e.message;
  }

  return result;
};

// put
export const updateMovieToDBById = async (movie: Movie, apiKey: string) => {
  const result = {
    data: [],
    error: null,
  } as any;

  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, apiKey);

    const { data, error } = await supabase.rpc("update_movie_by_id", {
      p_movie_id: movie.id,
      p_banner_image_url: movie.banner_image_url,
      p_description: movie.description,
      p_download_url: movie.download_url,
      p_duration: movie.duration,
      p_genres: movie.genres,
      p_poster_image_url: movie.poster_image_url,
      p_rating: movie.rating,
      p_release_date: movie.release_date,
      p_title: movie.title,
      p_trailer_url: movie.trailer_url,
      p_watch_url: movie.watch_url,
    });

    if (error) {
      result.error = error.message;
      return result;
    }

    result.data = "Movie updated successfully";
  } catch (e: any) {
    result.error = e.message;
  }

  return result;
};

// public
// get
export const getMoviesFromDB = async (page: number) => {
  const result = {
    data: [],
    error: null,
  } as {
    data: MovieList;
    error: null | string;
  };

  const { data, error } = await supabase.rpc("get_all_movies_with_pagination", {
    p_page_number: page,
    p_page_size: constants.MAIN_PAGE_SIZE,
  });

  if (error) {
    result.error = error.message;
  } else {
    result.data = data;
  }

  return result;
};

// get by id
export const getMovieFromDBById = async (id: number) => {
  const result = {
    data: [],
    error: null,
  } as {
    data: MovieList;
    error: null | string;
  };

  const { data, error } = await supabase.rpc("get_movie_by_id", {
    p_movie_id: id,
  });

  if (error) {
    result.error = error.message;
  } else if (data?.length > 0) {
    result.data = data[0];
  } else {
    result.error = "Movie not found";
  }

  return result;
};

export const getTotalMoviesPagesCount = async () => {
  const { data, error } = await supabase.rpc("get_total_movie_pages", {
    p_page_size: constants.MAIN_PAGE_SIZE,
  });

  if (error) {
    return -1;
  }

  return data;
};
