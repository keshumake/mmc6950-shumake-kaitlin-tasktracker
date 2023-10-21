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

      const {id, name} = req.query;
      if (id == null || name == null) {
        res.status(400).json({ response: "Parameter(s) missing" });
    }
    if (!connection) {
        createConnection();
      }
      await connection.execute(
        `update TaskList set name = ? WHERE id = ?`,
        [name, id]
      );
      const results = await connection.execute(
        `select * FROM TaskList where id = ?`,
        [id]
      );
            res.status(200).json({ response: "success" });
}, sessionOptions);
