import { db } from "../config/database.js";

export async function getUrl(req, res) {
  const id = req.params;
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
  const shortUrl = req.params;
  try {
    const url = await db.query(
      `SELECT url,views FROM urls WHERE "shortUrl"=$1`,
      [shortUrl]
    );
    if (url.rows.length === 0) {
      return res.sendStatus(404);
    }

    await db.query(`UPDATE urls SET views=$1 WHERE "shortUrl"=$2`, [
      url.rows[0].views + 1,
      shortUrl,
    ]);

    return res.redirect(url.rows[0].url);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function ranking(req, res) {
  try {
    const ranking = await db.query(
      `SELECT users.id,users.name, COUNT(urls.id) AS "linksCount", 
      SUM(urls.views) AS "visitCount" FROM users Left JOIN urls ON users.id = urls."userId" 
      GROUP BY users.id ORDER BY "visitCount" DESC LIMIT 10;`
    );

    res.status(200).send(ranking.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
