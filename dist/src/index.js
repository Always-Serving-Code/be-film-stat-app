"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const api_router_1 = __importDefault(require("./routes/api-router"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api", api_router_1.default);
app.all("*", (req, res) => {
    res.status(404).send({ msg: "Not Found" });
});
app.use((err, req, res, next) => {
    if (err.name === "CastError") {
        res.status(400).send({ msg: "Bad Request" });
    }
    else if ("msg" in err && "status" in err) {
        res.status(err["status"]).send({ msg: err["msg"] });
    }
    else {
        return next(err);
    }
});
app.use((err, req, res, next) => {
    res.status(500).send({ msg: "Internal Server Error" });
});
exports.default = app;
