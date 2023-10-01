import { connect, Connection } from "@planetscale/database";

export let connection;

export const createConnection = () => {
  const config = {
    host: process.env["DATABASE_HOST"],
    username: process.env["DATABASE_USERNAME"],
    password: process.env["DATABASE_PASSWORD"],
  };
  connection = connect(config)
};

