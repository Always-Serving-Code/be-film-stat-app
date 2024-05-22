import express from "express";
import { getUsers, getUserById, getFilmsByUserId,  } from '../controllers/users-controller';

const usersRouter = express.Router();

usersRouter.route("/").get(getUsers);
usersRouter.route("/:user_id").get(getUserById);

usersRouter.route('/:user_id/films').get(getFilmsByUserId)

export default usersRouter;
