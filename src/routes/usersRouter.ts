import express from "express";
import { getUsers } from "../controllers/users-controller";

const usersRouter = express.Router();

usersRouter.route("/").get(getUsers);

export default usersRouter;
