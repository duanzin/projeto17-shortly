import { Router } from "express";
import { signUp, signIn } from "../controllers/authController.js";
import {  } from "../schemas/Schema.js";
import { validateSchema } from "../middlewares/validateSchema.js";

const authRouter = Router();

authRouter.post("/signup", validateSchema(), signUp);
authRouter.post("/signin", validateSchema(), signIn)

export default authRouter;