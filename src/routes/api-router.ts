import { getEndpoints } from "../controllers/endpoint-controller";
import express from "express";
import usersRouter from "./users-router";
import filmsRouter from "./films-router";

const apiRouter = express.Router();

apiRouter.route("/").get(getEndpoints);
apiRouter.use("/users", usersRouter);
apiRouter.use("/films", filmsRouter);
export default apiRouter;
