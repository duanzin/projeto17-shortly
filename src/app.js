import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import siteRouter from "./routes/siteRouter.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use([authRouter, userRouter, siteRouter]);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`O server está rodando na porta: ${port}`));
