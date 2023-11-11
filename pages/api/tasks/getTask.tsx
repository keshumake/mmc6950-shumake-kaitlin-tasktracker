import type { NextApiRequest, NextApiResponse } from 'next';
import { createConnection, connection } from "@/dbconnection";
import { Tasks } from '@/types/dbTypes';
import { withIronSessionApiRoute } from "iron-session/next";
import sessionOptions from "../../../config/session";


type Data = {
  response: string;
  data: Tasks | null;
};

export default withIronSessionApiRoute(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

      const {id} = req.query;
      if (id == null) {
        res.status(400).json({ response: "Parameter(s) missing", data: null });
    }
    if (!connection) {
        createConnection();
      }
      const results = await connection.execute(
        `select * FROM Tasks where id = ? LIMIT 1`,
        [id]
      );
     

    res.status(200).json({ response: results.rows.length > 0 ? "Success" : "Failure", data: results.rows[0] as Tasks });
}, sessionOptions);
