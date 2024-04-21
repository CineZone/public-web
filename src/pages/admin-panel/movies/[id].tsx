import AdminHeader from "@/components/admin/AdminHeader";
import AdminLayout from "@/components/admin/AdminLayout";
import FormHeader from "@/components/admin/FormHeader";
import MultiSelection from "@/components/global/MultiSelection";
import apiEndPoints from "@/constants/apiEndPoints";
import { GenreList, Movie } from "@/types";
import api from "@/utils/api";
import { getGenreFromDB, getMovieFromDBById } from "@/utils/dbHelpers";
import { getAdminApiKey } from "@/utils/helpers";
import notify from "@/utils/notify";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const _init = {
  title: "",
  poster_image_url: "",
  banner_image_url: "",
  description: "",
  release_date: "",
  genres: [],
  duration: 0,
  rating: 0,
  trailer_url: "",
  watch_url: "",
  download_url: "",
};

type Props = {
  genres: GenreList;
  movie: Movie | null;
  error: string | null;
};

const AddMovieForm = ({ genres, movie, error }: Props) => {
  const router = useRouter();

  const [formData, setFormData] = useState<Movie>(_init);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(formData);

    // @ts-ignore
    const genres = formData.genres.map((item) => item.id);

    const payload = {
      movie: { ...formData, genres } as Movie,
      apiKey: getAdminApiKey(),
    };

    console.log(payload);

    const thenFn = (res: any) => {
      notify.success(res.data.message);
      router.replace("/admin-panel/movies");
    };

    const catchFn = (err: any) => {
      notify.error(err.response.data.message);
    };

    if (formData.id) {
      api.put(apiEndPoints.MOVIE_HANDLER, payload).then(thenFn).catch(catchFn);
    } else {
      api.post(apiEndPoints.MOVIE_HANDLER, payload).then(thenFn).catch(catchFn);
    }
  };

  useEffect(() => {
    if (movie) {
      setFormData(movie);
    }
  }, []);

  return (
    <>
      <AdminHeader name="Movies" />
      <div className="px-4 pt-4 pb-10">
        {error ? (
          <div>
            <h1 className="text-red-500 text-center">{error}</h1>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mx-auto  text-black">
            <FormHeader
              title={movie?.id ? "Edit Movie" : "Add Movie"}
              onBack={() => {
                router.replace("/admin-panel/movies");
              }}
            />
            <div className="mb-4 mt-4">
              <label htmlFor="title" className="block text-sm font-medium text-white">
                Title
              </label>
              <input
                required
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="poster_image_url" className="block text-sm font-medium text-white">
                Poster Image URL
              </label>
              <input
                required
                type="text"
                id="poster_image_url"
                name="poster_image_url"
                value={formData.poster_image_url}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="banner_image_url" className="block text-sm font-medium text-white">
                Banner Image URL
              </label>
              <input
                required
                type="text"
                id="banner_image_url"
                name="banner_image_url"
                value={formData.banner_image_url}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-white">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              ></textarea>
            </div>

            <div className="mb-4">
              <label htmlFor="release_date" className="block text-sm font-medium text-white">
                Release Date
              </label>
              <input
                required
                type="text"
                id="release_date"
                name="release_date"
                value={formData.release_date}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="duration" className="block text-sm font-medium text-white">
                Duration (minutes)
              </label>
              <input
                required
                type="number"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="rating" className="block text-sm font-medium text-white">
                Rating
              </label>
              <input
                required
                type="number"
                id="rating"
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="trailer_url" className="block text-sm font-medium text-white">
                Trailer URL
              </label>
              <input
                type="text"
                id="trailer_url"
                name="trailer_url"
                value={formData.trailer_url}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="watch_url" className="block text-sm font-medium text-white">
                Watch URL
              </label>
              <input
                type="text"
                id="watch_url"
                name="watch_url"
                value={formData.watch_url}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="download_url" className="block text-sm font-medium text-white">
                Download URL
              </label>
              <input
                type="text"
                id="download_url"
                name="download_url"
                value={formData.download_url}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>

            <MultiSelection
              title="Genres"
              options={genres}
              searchPlaceholder="Search"
              value={formData.genres}
              onChange={(e) => {
                setFormData({ ...formData, genres: e });
              }}
            />
          </form>
        )}
      </div>
    </>
  );
};

AddMovieForm.Layout = AdminLayout;

export default AddMovieForm;

export const getServerSideProps = async (context: NextPageContext) => {
  let error = null;
  let movie: any = null;
  let genres: GenreList = [];

  try {
    const { data } = await getGenreFromDB();
    genres = data;

    const { id } = context.query;
    if (id != "create") {
      // @ts-ignore
      const res = await getMovieFromDBById(parseInt(id));

      if (res.error) {
        error = res.error;
      } else {
        movie = res.data;
        movie.genres = movie.genres?.map((item: string) => genres.find((i) => i.name === item)) || [];
      }
    }
  } catch (e) {
    // @ts-ignore
    error = e.message;
  }

  return {
    props: {
      genres,
      movie,
      error,
    },
  };
};
