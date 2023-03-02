import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { db } from "../config/database.js";

export async function signUp(req, res) {
  const { name, email, password } = req.body;
  const passhash = bcrypt.hashSync(password, 10);
  try {
    const userExists = await db.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);
    if (userExists.rows.length !== 0) {
      return res.sendStatus(409);
    }

    await db.query(
      `INSERT INTO users (name, email, password) VALUES($1, $2, $3)`,
      [name, email, passhash]
    );
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;
  try {
    const user = await db.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);
    const passmatch = await bcrypt.compareSync(password, user.rows[0].password);

    if (user.rows.length == 0 || !passmatch) {
      return res.sendStatus(401);
    }

    const token = uuid();

    await db.query(`INSERT INTO sessions (token,"userId") VALUES ($1, $2)`, [
      token,
      user.rows[0].id,
    ]);
    res.status(200).send({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
}
