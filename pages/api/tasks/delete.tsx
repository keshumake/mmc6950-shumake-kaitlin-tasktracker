import type { NextApiRequest, NextApiResponse } from 'next';
import { createConnection, connection } from "@/dbconnection";
import { withIronSessionApiRoute } from "iron-session/next";
import sessionOptions from "../../../config/session";

type Data = {
  response: string;
};

export default withIronSessionApiRoute(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

      const {id} = req.query;
      if (id == null) {
        res.status(400).json({ response: "Parameter(s) missing" });
    }
    if (!connection) {
        createConnection();
      }
      await connection.execute(
        `delete FROM Tasks where id = ?`,
        [id]
      );
      const results = await connection.execute(
        `select * FROM Tasks where id = ?`,
        [id]
      );
      

    res.status(200).json({ response: results.rows.length > 0 ? "Failure" : "Tasks deleted" });
}, sessionOptions);
