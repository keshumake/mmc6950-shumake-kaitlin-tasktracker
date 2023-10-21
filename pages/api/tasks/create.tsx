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

      const {description, priority, duration, taskListId} = req.query;
      if (description == null || priority == null || duration == null || taskListId == null) {
        res.status(400).json({ response: "Parameter(s) missing" });
    }
    if (!connection) {
        createConnection();
      }
      const results = await connection.execute(
        `insert INTO Tasks (description, priority, duration, taskListId, updatedAt) VALUES (?,?,?,?,NOW())`,
        [description, priority, duration, taskListId]
      );
      const task = await connection.execute(
        `select * FROM Tasks WHERE description = ? and priority = ? and duration = ? and taskListId = ?`,
        [description, priority, duration, taskListId]
      );

    res.status(200).json({ response: task.rows.length > 0 ? "success" : "failure" });
}, sessionOptions);
