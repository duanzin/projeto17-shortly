import { db } from "../config/database.js";

export async function getUrl(req, res) {
  const { id } = req.params;
  try {
    const url = await db.query(
      `SELECT id,"shortUrl",url FROM urls WHERE id=$1`,
      [id]
    );
    if (url.rows.length == 0) {
      return res.sendStatus(404);
    }
    return res.status(200).send(url.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function openUrl(req, res) {
  const { url } = req.params;
  try {
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function ranking(req, res) {
  try {
  } catch (err) {
    res.status(500).send(err.message);
  }
}
