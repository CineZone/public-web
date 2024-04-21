export type Movie = {
  id?: number;
  title: string;
  poster_image_url: string;
  banner_image_url: string;
  description: string;
  release_date: string;
  genres: string[] | number[];
  duration: number;
  rating: number;
  trailer_url: string;
  watch_url: string;
  download_url: string;
  isLiked?: boolean;
};

export type MovieList = Movie[];

export type MovieListObject = {
  [key: string | number]: Movie;
};

export type Genre = {
  id: number;
  name: string;
};

export type GenreList = Genre[];

export type Pagination = {
  page: number;
  pageSize: number;
  totalPages: number;
};
