import express from "express";

const usersRouter = express.Router();

usersRouter.route("/").get();

export default usersRouter;
