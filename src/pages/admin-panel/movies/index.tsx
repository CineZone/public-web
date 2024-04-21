import AdminHeader from "@/components/admin/AdminHeader";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminListHeader from "@/components/admin/AdminListHeader";
import Loader from "@/components/global/Loader";
import PaginationComponent from "@/components/PaginationComponent";
import apiEndPoints from "@/constants/apiEndPoints";
import constants from "@/constants/constants";
import { Movie, MovieList, Pagination } from "@/types";
import api from "@/utils/api";
import { getAdminApiKey } from "@/utils/helpers";
import notify from "@/utils/notify";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";

const _init_pagination = {
  page: 1,
  pageSize: constants.MAIN_PAGE_SIZE,
  totalPages: 1,
};

const MoviesListPage = () => {
  const [movies, setMovies] = useState<MovieList>([]);
  const [pagination, setPagination] = useState<Pagination>(_init_pagination);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loader, setLoader] = useState(true);

  const loadMovies = useCallback(
    (pageNumber?: number) => {
      api
        .get(`${apiEndPoints.GET_MOVIES}?${pageNumber ? `page=${pageNumber}` : ""}`)
        .then((res) => {
          setMovies(res.data.data);
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

  const handleDelete = (movie: Movie) => {
    if (confirm(`Are you sure you want to delete "${movie.title}"?`)) {
      api
        .post(apiEndPoints.MOVIE_HANDLER, {
          movie: { id: movie.id },
          apiKey: getAdminApiKey(),
          deleteMovie: true,
        })
        .then((res) => {
          notify.success(res.data.message);
          setMovies(movies.filter((m) => m.id !== movie.id));
        })
        .catch((err) => {
          notify.error(err.response.data.message);
        });
    }
  };

  useEffect(() => {
    const page: any = searchParams.get("page") || 1;
    loadMovies(page);
  }, []);

  return (
    <div>
      <AdminHeader name="Movies" />
      <div className="px-4 pt-4 pb-10">
        <AdminListHeader title="All Movies" onCreateLink="/admin-panel/movies/create" />

        {/* Table */}
        {loader ? (
          <div className="mx-auto py-5 w-fit">
            <Loader />
          </div>
        ) : (
          <table className="table-auto w-full border-collapse border border-gray-500">
            <thead>
              <tr className="bg-gray-900">
                <th className="border border-gray-500 px-4 py-2">ID</th>
                <th className="border border-gray-500 px-4 py-2">Poster</th>
                <th className="border border-gray-500 px-4 py-2">Title</th>
                <th className="border border-gray-500 px-4 py-2">Release Date</th>
                <th className="border border-gray-500 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie.id}>
                  <td className="border border-gray-500 px-4 py-2 text-center">{movie.id}</td>
                  <td className="border border-gray-500 px-4 py-2 text-center">
                    <img src={movie.poster_image_url} alt={movie.title} className="w-24 mx-auto h-auto" />
                  </td>
                  <td className="border border-gray-500 px-4 py-2 text-center">{movie.title}</td>
                  <td className="border border-gray-500 px-4 py-2 text-center">
                    {new Date(movie.release_date).getFullYear()}
                  </td>
                  <td className="border border-gray-500 px-4 py-2 ">
                    <div className="flex justify-around">
                      <Link
                        className="text-blue-500 hover:text-blue-700 mr-2"
                        href={`/admin-panel/movies/${movie.id}`}
                      >
                        <FaPen />
                      </Link>
                      <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(movie)}>
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <PaginationComponent pagination={pagination} onPageChange={onPageChange} />
      </div>
    </div>
  );
};

MoviesListPage.Layout = AdminLayout;

export default MoviesListPage;
