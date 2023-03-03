import { db } from "../config/database.js";

export async function validateToken(req, res, next) {
  try {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if (!token) return res.sendStatus(401);

    const session = await db.query(`SELECT "userId" FROM sessions WHERE token=$1`, [token]);
    if (session.rows.length == 0) return res.sendStatus(401);

    res.locals.session = session.rows[0].userId;

    next();
  } catch (error) {
    res.status(500).send(error);
  }
}
