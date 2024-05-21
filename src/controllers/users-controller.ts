// import { postUser } from "../models/users-models"
import { Response, Request, NextFunction } from "express";
import { User } from "../models/users-model";
import { dbClose, dbOpen } from "../db-connection";

// export const addUser = async (req: Request, res: Response) => {
//     const userToAdd: object = req.body
// }

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
    res.status(200).send({ user });
    await dbClose();
  } catch (next) {}
};
