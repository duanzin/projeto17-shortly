import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { db } from "../config/database.js";

export async function signUp(req, res) {
  const passHash = bcrypt.hashSync(req.body.password, 10);
  try {
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function signIn(req, res) {
  try {
  } catch (err) {
    res.status(500).send(err.message);
  }
}
