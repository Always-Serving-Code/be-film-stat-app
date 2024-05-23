"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFilmFromUserByIds = exports.getFilmsByUserId = exports.patchUserById = exports.getUserById = exports.getUsers = void 0;
const users_model_1 = require("../models/users-model");
const db_connection_1 = require("../db-connection");
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_connection_1.dbOpen)();
        const users = yield users_model_1.User.find();
        res.status(200).send({ users });
        yield (0, db_connection_1.dbClose)();
    }
    catch (err) {
        next(err);
    }
});
exports.getUsers = getUsers;
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_connection_1.dbOpen)();
        const { user_id } = req.params;
        const user = yield users_model_1.User.findById(user_id);
        if (!user) {
            return next({ status: 404, msg: "Not Found" });
        }
        res.status(200).send({ user });
        yield (0, db_connection_1.dbClose)();
    }
    catch (err) {
        next(err);
    }
});
exports.getUserById = getUserById;
const patchUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_connection_1.dbOpen)();
        const { user_id } = req.params;
        const { films } = req.body;
        const runtime = films.runtime;
        const user = yield users_model_1.User.findById(user_id);
        if (!user) {
            return next({ status: 404, msg: "Not Found" });
        }
        else {
            const updatedFilms = Object.assign(Object.assign({}, films), { date_watched: new Date() });
            const updatedUser = yield users_model_1.User.findByIdAndUpdate(user_id, { $push: { films: updatedFilms } }, { new: true });
            res.status(200).send({ user: updatedUser });
        }
        yield (0, db_connection_1.dbClose)();
    }
    catch (err) {
        next(err);
    }
});
exports.patchUserById = patchUserById;
const getFilmsByUserId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id } = req.params;
    try {
        yield (0, db_connection_1.dbOpen)();
        const user = yield users_model_1.User.find({ _id: user_id });
        if (!user.length) {
            return next({ status: 404, msg: "Not Found" });
        }
        else {
            const films = user[0]["films"];
            if (!films.length) {
                return next({ status: 404, msg: "No Films Added Yet!" });
            }
            res.status(200).send({ films });
        }
        yield (0, db_connection_1.dbClose)();
    }
    catch (err) {
        next(err);
    }
});
exports.getFilmsByUserId = getFilmsByUserId;
const deleteFilmFromUserByIds = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, film_id } = req.params;
    if (isNaN(+film_id)) {
        return next({ status: 400, msg: "Bad Request" });
    }
    try {
        yield (0, db_connection_1.dbOpen)();
        const user = yield users_model_1.User.find({ _id: user_id });
        if (!user.length) {
            return next({ status: 404, msg: "Not Found" });
        }
        const films = user[0]["films"];
        const filmInitialLength = films.length;
        let filmRuntime = 0;
        while (films.length === filmInitialLength) {
            films.forEach((film, index) => {
                if (film["_id"] === +film_id) {
                    filmRuntime = film["runtime"];
                    films.splice(index, 1);
                }
            });
            if (films.length === filmInitialLength) {
                return next({ status: 404, msg: "Not Found" });
            }
        }
        yield users_model_1.User.updateOne({ _id: user_id }, { $set: { films: films } });
        res.status(204).send();
        yield (0, db_connection_1.dbClose)();
    }
    catch (err) {
        next(err);
    }
});
exports.deleteFilmFromUserByIds = deleteFilmFromUserByIds;
