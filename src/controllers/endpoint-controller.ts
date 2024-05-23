import endpoints from "../../endpoints.json";
import { NextFunction, Request, Response } from "express";

export const getEndpoints = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).send({ endpoints });
  } catch (err) {
    next(err);
  }
};
