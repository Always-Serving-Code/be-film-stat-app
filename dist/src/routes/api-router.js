"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const endpoint_controller_1 = require("../controllers/endpoint-controller");
const express_1 = __importDefault(require("express"));
const usersRouter_1 = __importDefault(require("./usersRouter"));
const filmsRouter_1 = __importDefault(require("./filmsRouter"));
const apiRouter = express_1.default.Router();
apiRouter.route("/").get(endpoint_controller_1.getEndpoints);
apiRouter.use("/users", usersRouter_1.default);
apiRouter.use("/films", filmsRouter_1.default);
exports.default = apiRouter;
