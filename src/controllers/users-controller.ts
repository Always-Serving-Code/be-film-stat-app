// import { postUser } from "../models/users-models"
import { Response, Request } from "express";
import { User } from "../models/users-model";
import { dbClose, dbOpen } from "../db-connection";

// export const addUser = async (req: Request, res: Response) => {
//     const userToAdd: object = req.body
// }

export const getUsers = async (req: Request, res: Response) => {
  try {
    await dbOpen();
    const users = await User.find();
    res.status(200).send({ users });
    await dbClose();
  } catch (err) {
    console.log("errorrrrrr", err);
  }
};
