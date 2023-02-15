import { Router } from "express";
import { getUrl, openUrl, ranking } from "../controllers/siteController.js";

const siteRouter = Router();

siteRouter.get("/urls/:id", getUrl);
siteRouter.get("/urls/open/:shortUrl", openUrl);
siteRouter.get("/ranking", ranking);

export default siteRouter;