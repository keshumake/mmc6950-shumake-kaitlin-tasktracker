
import type { NextApiRequest, NextApiResponse } from 'next';
import { createConnection, connection } from "@/dbconnection";


type Data = {
  response: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

      const {name, userId} = req.query;
      if (name == null || userId == null) {
        res.status(400).json({ response: "Parameter(s) missing" });
    }
    if (!connection) {
        createConnection();
      }
      const results = await connection.execute(
        `insert INTO TaskList (name, userId) VALUES (?,?)`,
        [name, userId]
      );
      const taskList = await connection.execute(
        `select * FROM TaskList WHERE name = ? and userId = ?`,
        [name, userId]
      );

    res.status(200).json({ response: taskList.rows.length > 0 ? "success" : "failure" });
}
