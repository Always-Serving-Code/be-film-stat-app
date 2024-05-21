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
  } catch (err) {
    next(err);
  }
};
