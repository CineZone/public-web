import { getGenreFromDB } from "@/utils/dbHelpers";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { data, error } = await getGenreFromDB();

    if (error) {
      res.status(500).json({ message: "An error occurred while fetching genres" });
      return;
    }

    res.status(200).json(data);
    return;
  }

  res.status(405).json({ message: "Method not allowed" });
};

export default handler;
