import { db } from "../config/database.js";
import { nanoid } from "nanoid";

export async function shortenUrl(req, res) {
  const { userId } = res.locals.session;
  const { url } = req.body;
  try {
    const shortUrl = nanoid();
    await db.query(
      `INSERT INTO urls (url,"userId","shortUrl") VALUES ($1,$2,$3)`,
      [url, userId, shortUrl]
    );
    const id = await db.query(`SELECT id FROM urls WHERE "shortUrl" = $1`, [
      shortUrl,
    ]);
    res.status(201).send({ id: id.rows[0], shortUrl: shortUrl });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function deleteUrl(req, res) {
  try {
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getUser(req, res) {
  try {
  } catch (err) {
    res.status(500).send(err.message);
  }
}
