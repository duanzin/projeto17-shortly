import { db } from "../config/database.js";
import { nanoid } from "nanoid";

export async function shortenUrl(req, res) {
  const userId = res.locals;
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
    res.status(201).send({ id: id.rows[0].id, shortUrl: shortUrl });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function deleteUrl(req, res) {
  const userId = res.locals;
  const urlId = req.params.id;
  try {
    console.log(urlId);
    const url = await db.query(`SELECT * FROM urls WHERE id=$1;`, [urlId]);
    if (url.rows.length == 0) {
      return res.sendStatus(404);
    }
    if (url.rows[0].userId !== userId) {
      return res.sendStatus(404);
    }
    await db.query(`DELETE FROM urls WHERE id=$1`, [urlId]);
    return res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getUser(req, res) {
  const userId = res.locals;
  let totalViews = 0;
  try {
    const user = await db.query(`SELECT id, name FROM users WHERE id=$1`, [
      userId,
    ]);
    const urls = await db.query(
      `SELECT id,"shortUrl",url,"visitCount" FROM urls WHERE "userId"=$1`,
      [userId]
    );

    for (let i = 0; i < urls.rows.length; i++) {
      totalViews += urls.rows[i].visitCount;
    }

    const userObj = {
      id: user.rows[0].id,
      name: user.rows[0].name,
      visitCount: totalViews,
    };

    userObj.shortenedUrls = urls.rows;
    res.status(200).send(userObj);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
