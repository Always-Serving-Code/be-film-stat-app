import express, { Express } from "express";
import dotenv from "dotenv";
import apiRouter from "./routes/api-router";

dotenv.config();

const app: Express = express();

app.use("/api", apiRouter);

export default app;
