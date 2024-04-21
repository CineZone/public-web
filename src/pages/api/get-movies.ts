import constants from "@/constants/constants";
import { getMoviesFromDB, getTotalMoviesPagesCount } from "@/utils/dbHelpers";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { page }: any = req.query;

    const { data, error } = await getMoviesFromDB(page ? parseInt(page) : 1);

    if (error) {
      res.status(500).json({ message: "An error occurred while fetching movies" });
      return;
    }

    res.status(200).json({
      data: data,
      pagination: {
        page: page ? parseInt(page) : 1,
        pageSize: constants.MAIN_PAGE_SIZE,
        totalPages: await getTotalMoviesPagesCount(),
      },
    });
    return;
  }

  res.status(405).json({ message: "Method not allowed" });
};

export default handler;
