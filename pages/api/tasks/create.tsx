import type { NextApiRequest, NextApiResponse } from 'next';
import { createConnection, connection } from "@/dbconnection";
import { withIronSessionApiRoute } from "iron-session/next";
import sessionOptions from "../../../config/session";
import { Priority, Tasks } from '@/types/dbTypes';


type Data = {
  response: string;
  data?: Tasks | null,
};

export default withIronSessionApiRoute(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

      const {description, priority, duration, taskListId} = req.query;
      console.log('req.query ', req.query)
      if (description == null || priority == null || duration == null || taskListId == null) {
        res.status(400).json({ response: "Parameter(s) missing" });
    }
    if (!connection) {
        createConnection();
      }
      const results = await connection.execute(
        `insert INTO Tasks (description, priority, duration, taskListId, updatedAt) VALUES (?,?,?,?,NOW())`,
        [description, priority as Priority, Number(duration), Number(taskListId)]
      );
      const task = await connection.execute(
        `select * FROM Tasks WHERE description = ? and priority = ? and duration = ? and taskListId = ?`,
        [description, priority as Priority, Number(duration), Number(taskListId)]
      );

    res.status(200).json({ response: task.rows.length > 0 ? "Created" : "Failure", data: task.rows.length > 0 ? task.rows[0] : null });
}, sessionOptions);
