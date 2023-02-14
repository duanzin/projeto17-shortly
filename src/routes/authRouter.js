import { Router } from "express";
import { signUp, signIn } from "../controllers/authController.js";
import {  } from "../schemas/authSchema.js";
import { validateSchema } from "../middlewares/validateSchema.js";

const authRouter = Router();

customerRouter.post("/signup", validateSchema(), signUp);
customerRouter.post("/signin", validateSchema(), signIn)

export default authRouter;