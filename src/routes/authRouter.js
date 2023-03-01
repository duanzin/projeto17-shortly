import { Router } from "express";
import { signUp, signIn } from "../controllers/authController.js";
import { signinSchema, signupSchema } from "../schemas/Schema.js";
import { validateSchema } from "../middlewares/validateSchema.js";

const authRouter = Router();

authRouter.post("/signup", validateSchema(signupSchema), signUp);
authRouter.post("/signin", validateSchema(signinSchema), signIn)

export default authRouter;