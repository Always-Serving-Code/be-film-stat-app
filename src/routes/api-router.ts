import { getEndpoints } from "../controllers/endpoint-controller";
import express from "express";
import usersRouter from "./usersRouter";

const apiRouter = express.Router();

apiRouter.route("/").get(getEndpoints);
apiRouter.use("/users", usersRouter);

export default apiRouter;
