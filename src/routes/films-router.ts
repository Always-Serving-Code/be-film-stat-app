import express from "express";
import { getFilms, getFilmById } from "../controllers/films-controller";

const filmsRouter = express.Router();

filmsRouter.route("/").get(getFilms);
filmsRouter.route('/:film_id').get(getFilmById)

export default filmsRouter;
