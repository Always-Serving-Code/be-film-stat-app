"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const endpoint_controller_1 = require("../controllers/endpoint-controller");
const express_1 = __importDefault(require("express"));
const apiRouter = express_1.default.Router();
apiRouter.route("/").get(endpoint_controller_1.getEndpoints);
exports.default = apiRouter;
