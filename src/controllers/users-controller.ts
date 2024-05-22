import { Response, Request, NextFunction } from "express";
import { User } from "../models/users-model";
import { dbClose, dbOpen } from "../db-connection";
import { Error } from "mongoose";
import { log } from "console";
import { IFilm } from "../models/film-model";
//fix this 

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await dbOpen();
    const users = await User.find();
    res.status(200).send({ users });
    await dbClose();
  } catch (next) {}
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await dbOpen();
    const { user_id } = req.params;
    const user = await User.find({ _id: user_id });
    if (!user.length) {
      res.status(404).send({ msg: "Not Found" });
    }
    res.status(200).send({ user });
    await dbClose();
  } catch (err: any) {
    next(err);
  }
};

export const patchUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await dbOpen();
    const { user_id } = req.params;
    const { films } = req.body;

    const runtime = films.runtime;
    const user = await User.find({ _id: user_id });

    const arr = [];
    arr.push(films);
    let counter = user[0].stats["num_films_watched"];
    for (let i = 0; i < arr.length; i++) {
      if (arr) {
        counter++;
      }
    }

    let currentRuntime = user[0].stats["hours_watched"];
    currentRuntime += runtime;

    const updatedUser = await User.findByIdAndUpdate(
      user_id,
      {
        $push: { films: films },
        $set: {
          "stats.hours_watched": currentRuntime,
          "stats.num_films_watched": counter,
        },
      },
      { new: true }
    );
    res.status(200).send({ user: updatedUser });
    await dbClose();
  } catch (err) {
    next(err);
  }
};

export const getFilmsByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.params;
  try {
    await dbOpen();
    const user = await User.find({ _id: user_id });
    if (!user.length) {
      return next({ status: 404, msg: "Not Found" });
    } else {
      const films: object[] = user[0]["films"];
      if (!Object.keys(films[0]).length) {
        return next({ status: 404, msg: "No Films Added Yet!" });
      }
      res.status(200).send({ films });
    }
    await dbClose();
  } catch (err: any) {
    next(err);
  }
};

export const deleteFilmFromUserByIds = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user_id, film_id } = req.params;
  try {
    await dbOpen();
    const user = await User.find({ _id: user_id });
    let minutesWatched = user[0]["stats"]["hours_watched"];
    let newFilmsWatched = user[0]["stats"]["num_films_watched"];

    if (!user.length) {
      return next({ status: 404, msg: "Not Found" });
    } else {
      const films: object[] = user[0]["films"];
      if (!Object.keys(films[0]).length) {
        return next({ status: 404, msg: "No Films Added Yet!" });
      }
      const filmInitialLength: number = films.length;
      let filmRuntime: number = 0;
      while (films.length === filmInitialLength) {
        films.forEach((film: any, index: number) => {
          if (film["_id"] === +film_id) {
            filmRuntime = film["runtime"];
            films.splice(index, 1);
          }
        });
      }

      const newStats: object = {
        hours_watched: minutesWatched - filmRuntime,
        num_films_watched: newFilmsWatched - 1,
      };
      await User.updateMany(
        { _id: user_id },
        { $set: { films: films, stats: newStats } }
      );
      res.status(204).send();
    }
    await dbClose();
  } catch (err) {
    console.log("error");
  }
};
