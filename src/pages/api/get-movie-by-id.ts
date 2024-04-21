import constants from "@/constants/constants";
import { getMovieFromDBById } from "@/utils/dbHelpers";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { id }: any = req.query;

    if (!id) {
      res.status(400).json({ message: "Needs Id to find movie" });
      return;
    }

    const { data, error } = await getMovieFromDBById(id);

    if (error) {
      res.status(500).json({ message: "An error occurred while fetching movies" });
      return;
    }

    res.status(200).json(data);
    return;
  }

  res.status(405).json({ message: "Method not allowed" });
};

export default handler;
