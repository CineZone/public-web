import AppLayout from "@/components/AppLayout";
import Loader from "@/components/global/Loader";
import HomeBanner from "@/components/HomeBanner";
import MovieComponent from "@/components/MovieComponent";
import PaginationComponent from "@/components/PaginationComponent";
import apiEndPoints from "@/constants/apiEndPoints";
import constants from "@/constants/constants";
import { Movie, MovieList, Pagination } from "@/types";
import api from "@/utils/api";
import { addMovieToLiked, isMovieLiked, removeMovieFromLiked } from "@/utils/localStorageHelpers";
import notify from "@/utils/notify";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

const _init_pagination = {
  page: 1,
  pageSize: constants.MAIN_PAGE_SIZE,
  totalPages: 1,
};

const Home = () => {
  const [bannerMovie, setBannerMovie] = useState<Movie>();

  const [movies, setMovies] = useState<MovieList>([]);
  const [pagination, setPagination] = useState<Pagination>(_init_pagination);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loader, setLoader] = useState(true);

  const onLikePressed = useCallback(
    (movie: Movie) => {
      if (movie.isLiked) {
        removeMovieFromLiked(movie);
      } else {
        addMovieToLiked(movie);
      }

      // if banner movie
      if (bannerMovie && movie.id === bannerMovie.id) {
        // @ts-ignore
        setBannerMovie((prev) => ({ ...prev, isLiked: !prev.isLiked }));
      } else {
        setMovies((prev) =>
          prev.map((m) => {
            if (m.id === movie.id) {
              return { ...m, isLiked: !m.isLiked };
            }
            return m;
          })
        );
      }
    },
    [bannerMovie]
  );

  const loadMovies = useCallback(
    (pageNumber?: number) => {
      api
        .get(`${apiEndPoints.GET_MOVIES}?${pageNumber ? `page=${pageNumber}` : ""}`)
        .then((res) => {
          setMovies(res.data.data.map((item: Movie) => ({ ...item, isLiked: isMovieLiked(item) })));
          setBannerMovie(res.data.data[0]);
          setPagination(res.data.pagination);
          setLoader(false);
        })
        .catch((err) => {
          notify.error(err.response.data.message);
          setLoader(false);
        });
    },
    [setMovies, setPagination, setLoader]
  );

  const onPageChange = (num: number) => {
    setLoader(true);
    loadMovies(num);
    router.replace(`/admin-panel/movies?page=${num}`);
  };

  useEffect(() => {
    const page: any = searchParams.get("page") || 1;
    loadMovies(page);
  }, []);

  return (
    <div className="pb-10">
      {bannerMovie && <HomeBanner movie={bannerMovie} onLikePressed={onLikePressed} />}

      <div className="flex gap-2 items-center">
        <h1 className="text-2xl font-semibold my-4">Movies</h1>
        {loader && <Loader />}
      </div>

      {!loader && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-5">
            {movies.map((movie) => (
              <MovieComponent movie={movie} onLikePressed={onLikePressed} key={movie.id} />
            ))}
          </div>
          <PaginationComponent pagination={pagination} onPageChange={onPageChange} />
        </>
      )}
    </div>
  );
};

export default Home;

Home.Layout = AppLayout;
