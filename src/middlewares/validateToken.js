import { db } from "../config/database.js";

export async function validateToken(req, res, next) {
  try {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if (!token) return res.sendStatus(401);

    const session = await db.collection("sessions").findOne({ token });

    if (!session) return res.sendStatus(401);

    res.locals.session = session;

    next();
  } catch (error) {
    res.status(500).send(error);
  }
}
