import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import apiRouter from "./routes/api-router";

dotenv.config();

const app: Express = express();
app.use(express.json())

app.use("/api", apiRouter);
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  res.status(404).send({ msg: "Not Found" });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(400).send({ msg: "Bad Request" });
  next(err);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({ msg: "Internal Server Error" });
});

export default app;
