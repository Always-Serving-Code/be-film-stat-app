import express from "express";
import { getUserById, getUsers, patchUserById } from "../controllers/users-controller";

const usersRouter = express.Router();

usersRouter.route("/").get(getUsers);
usersRouter.route("/:user_id")
.get(getUserById)
.patch(patchUserById);


export default usersRouter;
