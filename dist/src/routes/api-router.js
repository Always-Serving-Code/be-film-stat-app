"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const endpoint_controller_1 = require("../controllers/endpoint-controller");
const express_1 = __importDefault(require("express"));
const users_router_1 = __importDefault(require("./users-router"));
const films_router_1 = __importDefault(require("./films-router"));
const apiRouter = express_1.default.Router();
apiRouter.route("/").get(endpoint_controller_1.getEndpoints);
apiRouter.use("/users", users_router_1.default);
apiRouter.use("/films", films_router_1.default);
exports.default = apiRouter;
