import { createConnection, connection } from "@/dbconnection";
import { hash } from "bcrypt";

export async function create(username, password) {
  if (!(username && password))
    throw new Error("Must include username and password");
  if (!connection) {
    createConnection();
  }
  const passwordHash = await hash(password, 10);
  await connection.execute(
    `INSERT INTO User (username, password) VALUES (?, ?)`,
    [username, passwordHash]
  );
  const results = await connection.execute(
    `SELECT * FROM User WHERE username=? LIMIT 1`,
    [username]
  );
  if (results.rows.length == 0) throw new Error("Error inserting User");
  return results.rows[0];
}
