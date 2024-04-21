import { deleteMovieToDBById, updateMovieToDBById, uploadMovieToDB } from "@/utils/dbHelpers";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { movie, apiKey, deleteMovie } = req.body;

  if (!movie || !apiKey) {
    res.status(400).json({ message: "Invalid request" });
    return;
  } else if (deleteMovie) {
    const { data, error } = await deleteMovieToDBById(movie, apiKey);

    if (error) {
      res.status(500).json({ message: error });
      return;
    }

    res.status(200).json({ message: "Movie deleted successfully", data });
    return;
  }

  // methods
  if (req.method === "POST") {
    const { data, error } = await uploadMovieToDB(movie, apiKey);

    if (error) {
      res.status(500).json({ message: error });
      return;
    }

    res.status(200).json({ message: "Movie uploaded successfully", data });
    return;
  } else if (req.method === "PUT") {
    const { data, error } = await updateMovieToDBById(movie, apiKey);

    if (error) {
      res.status(500).json({ message: error });
      return;
    }

    res.status(200).json({ message: "Movie updated successfully", data });
    return;
  }

  res.status(405).json({ message: "Method not allowed" });
}
