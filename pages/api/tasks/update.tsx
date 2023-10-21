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

      const {id, description, priority, duration} = req.query;
      if (id == null || description == null || priority == null || duration == null) {
        res.status(400).json({ response: "Parameter(s) missing" });
    }
    if (!connection) {
        createConnection();
      }
      await connection.execute(
        `update Tasks set description = ?, priority = ?, duration = ? WHERE id = ?`,
        [description, priority, duration, id]
      );
      const results = await connection.execute(
        `select * FROM Tasks where id = ?`,
        [id]
      );
      // if (results.rows.length > 0) {
      //   const task = results.rows[0]

      //   if (task.priority == priority && task.description == description && task.duration == duration) {
            // res.status(200).json({ response: "success" });
      //   }
      // }

    res.status(200).json({ response: "success" });
}, sessionOptions);
