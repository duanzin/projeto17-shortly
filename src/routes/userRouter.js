import { Router } from "express";
import { shortenUrl, deleteUrl, getUser } from "../controllers/userController.js";
import { urlSchema } from "../schemas/Schema.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { validateToken } from "../middlewares/validateToken.js";

const userRouter = Router();

userRouter.use(validateToken);
userRouter.post("/urls/shorten", validateSchema(urlSchema), shortenUrl);
userRouter.delete("/urls/:id", deleteUrl);
userRouter.get("/users/me", getUser);

export default userRouter;