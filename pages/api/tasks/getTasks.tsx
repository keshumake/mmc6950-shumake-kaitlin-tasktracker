import type { NextApiRequest, NextApiResponse } from 'next';
import { createConnection, connection } from "@/dbconnection";
import { Tasks } from '@/types/dbTypes';
import { withIronSessionApiRoute } from "iron-session/next";
import sessionOptions from "../../../config/session";

type Data = {
  response: string;
  data: Tasks[];
};

export default withIronSessionApiRoute(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const userId = (req.session as any).user?.id
  if (userId == null) {
        res.status(400).json({ response: "Parameter(s) missing", data: [] });
    }
    if (!connection) {
        createConnection();
      }
      const results = await connection.execute(
        `select * FROM Tasks where userId = ? `,
        [userId]
      );
     

    res.status(200).json({ response: results.rows.length > 0 ? "success" : "failure", data: results.rows as Tasks[] });
}, sessionOptions);
