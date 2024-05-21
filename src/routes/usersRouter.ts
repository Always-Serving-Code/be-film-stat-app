import express from "express";
import { getUsers, getFilmsByUserId } from '../controllers/users-controller';

const usersRouter = express.Router();

usersRouter.route("/").get(getUsers);

usersRouter.route('/:user_id/films').get(getFilmsByUserId)

export default usersRouter;
