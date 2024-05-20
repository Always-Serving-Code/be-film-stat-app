import { postUser } from "../models/users-models"
import { Response, Request } from "express"


export const addUser = async (req: Request, res: Response) => {
    const userToAdd: object = req.body
}