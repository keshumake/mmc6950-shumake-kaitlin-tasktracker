
import type { NextApiRequest, NextApiResponse } from 'next';
import { createConnection, connection } from "@/dbconnection";
import { withIronSessionApiRoute } from "iron-session/next";
import sessionOptions from "../../../config/session";
import { TaskList } from '@/types/dbTypes';




type Data = {
  response: string;
  data?: TaskList | null,
};

export default withIronSessionApiRoute(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
      console.log('req', req.session)
      const {name} = req.query;
      const userId = (req.session as any).user?.id
      if (name == null || userId == null ) {
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

    res.status(200).json({ response: taskList.rows.length > 0 ? "Task List Created" : "Failure", data: taskList.rows.length > 0 ? taskList.rows[0] : null });
}, sessionOptions);
