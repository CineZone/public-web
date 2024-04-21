import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { apiKey } = req.body;

    res.status(200).json({
      verified: apiKey === process.env.NEXT_PUBLIC_SUPABASE_ADMIN_KEY,
    });
    return;
  }

  res.status(405).json({ verified: false });
};

export default handler;
