import type { NextApiRequest, NextApiResponse } from 'next';
import { createConnection, connection } from "@/dbconnection";


type Data = {
  response: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

      const {description, priority, duration, userId} = req.query;
      if (description == null || priority == null || duration == null || userId == null) {
        res.status(400).json({ response: "Parameter(s) missing" });
    }
    if (!connection) {
        createConnection();
      }
      const results = await connection.execute(
        `insert INTO Tasks (description, priority, duration, userId, updatedAt) VALUES (?,?,?,?,NOW())`,
        [description, priority, duration, userId]
      );
      const task = await connection.execute(
        `select * FROM Tasks WHERE description = ? and priority = ? and duration = ? and userId = ?`,
        [description, priority, duration, userId]
      );

    res.status(200).json({ response: task.rows.length > 0 ? "success" : "failure" });
}
