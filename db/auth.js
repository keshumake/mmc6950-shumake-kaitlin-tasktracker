import { createConnection, connection } from "@/dbconnection";
import { compare } from "bcrypt";

export async function login(username, password) {
  if (!(username && password))
    throw new Error("Must include username and password");
  if (!connection) {
    createConnection();
  }
  const results = await connection.execute(
    `SELECT * FROM users WHERE username=?`,
    [username]
  );
  if (results.rows.length == 0) throw new Error("User not found");
  const user = results.rows[0];
  const isPasswordCorrect = await compare(password, user.password);
  if (!isPasswordCorrect) throw new Error("Password is incorrect");
  return user;
}
