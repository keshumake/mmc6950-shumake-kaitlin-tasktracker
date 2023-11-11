import type { NextApiRequest, NextApiResponse } from 'next';
import { createConnection, connection } from "@/dbconnection";
import { withIronSessionApiRoute } from "iron-session/next";
import sessionOptions from "../../../config/session";
import { TaskList, Tasks } from '@/types/dbTypes';

type taskToTaskList = {
  name: string;
  id: number;
  tasks: Tasks[];
}

type Data = {
    response: string;
    data: taskToTaskList[];
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
        const taskListResults = await connection.execute(
          `select * FROM TaskList where userId = ? `,
          [userId]
        );
        const taskLists = taskListResults.rows as TaskList[];
        let data: taskToTaskList[]= []
       for (const taskList of taskLists) {
        const results = await connection.execute(
          `select createdAt, updatedAt, Tasks.id as id, description, priority, duration, Tasks.taskListId as taskListId FROM TaskList inner JOIN Tasks on Tasks.taskListId = TaskList.id where userId = ? AND TaskList.id = ? `,
          [userId, taskList.id]
        );
        const tasks = results.rows as Tasks[]; 
        // console.log('tasks' ,tasks)
        data.push( {
          name: taskList.name,
          id: taskList.id,
          tasks,
        })
       } 
       
        console.log("data ", data)
  
      res.status(200).json({ response: data.length > 0 ? "Success" : "Failure", data: data as unknown as taskToTaskList[] ?? [] });
  }, sessionOptions);
  