import { getEndpoints } from "../controllers/endpoint-controller";
import express from "express";
import usersRouter from "./usersRouter";
import filmsRouter from "./filmsRouter";

const apiRouter = express.Router();

apiRouter.route("/").get(getEndpoints);
apiRouter.use("/users", usersRouter);
apiRouter.use("/films", filmsRouter);
export default apiRouter;
