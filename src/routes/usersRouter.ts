import express from "express";
import {
  getUsers,
  getUserById,
  getFilmsByUserId,
  patchUserById,
  deleteFilmFromUserByIds,
} from "../controllers/users-controller";

const usersRouter = express.Router();

usersRouter.route("/").get(getUsers);
usersRouter.route("/:user_id").get(getUserById).patch(patchUserById);
usersRouter.route("/:user_id/films").get(getFilmsByUserId);
usersRouter.route("/:user_id/:film_id").delete(deleteFilmFromUserByIds);

export default usersRouter;
