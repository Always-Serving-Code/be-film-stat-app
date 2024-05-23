import { Response, Request, NextFunction } from "express";
import { User } from "../models/users-model";
import { dbClose, dbOpen } from "../db-connection";

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
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await dbOpen();
    const { user_id } = req.params;
    const user = await User.findById(user_id);
    if (!user) {
      return next({ status: 404, msg: "Not Found" });
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
    const user = await User.findById(user_id);
    if (!user) {
      return next({ status: 404, msg: "Not Found" });
    } else {
      const updatedFilms = { ...films, date_watched: new Date() };

      const updatedUser = await User.findByIdAndUpdate(
        user_id,
        { $push: { films: updatedFilms } },
        { new: true }
      );
      res.status(200).send({ user: updatedUser });
    }
    await dbClose();
  } catch (err: any) {
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
      if (!films.length) {
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

  if (isNaN(+film_id)) {
    return next({ status: 400, msg: "Bad Request" });
  }

  try {
    await dbOpen();
    const user = await User.find({ _id: user_id });
    if (!user.length) {
      return next({ status: 404, msg: "Not Found" });
    }
    const films: object[] = user[0]["films"];
    const filmInitialLength: number = films.length;
    let filmRuntime: number = 0;

    while (films.length === filmInitialLength) {
      films.forEach((film: any, index: number) => {
        if (film["_id"] === +film_id) {
          filmRuntime = film["runtime"];
          films.splice(index, 1);
        }
      });
      if (films.length === filmInitialLength) {
        return next({ status: 404, msg: "Not Found" });
      }
    }

    await User.updateOne({ _id: user_id }, { $set: { films: films } });
    res.status(204).send();

    await dbClose();
  } catch (err: any) {
    next(err);
  }
};
