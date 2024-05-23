"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("../controllers/users-controller");
const usersRouter = express_1.default.Router();
usersRouter.route("/").get(users_controller_1.getUsers);
usersRouter.route("/:user_id").get(users_controller_1.getUserById).patch(users_controller_1.patchUserById);
usersRouter.route("/:user_id/films").get(users_controller_1.getFilmsByUserId);
usersRouter.route("/:user_id/:film_id").delete(users_controller_1.deleteFilmFromUserByIds);
exports.default = usersRouter;
