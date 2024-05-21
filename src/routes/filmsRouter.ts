import express from "express";
import { getFilms } from "../controllers/films-controller";

const filmsRouter = express.Router();

filmsRouter.route("/").get(getFilms);

export default filmsRouter;
