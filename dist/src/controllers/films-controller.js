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
exports.getFilms = void 0;
const film_model_1 = require("../models/film-model");
const db_connection_1 = require("../db-connection");
const getFilms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_connection_1.dbOpen)();
        const films = yield film_model_1.Film.find();
        res.status(200).send({ films });
        yield (0, db_connection_1.dbClose)();
    }
    catch (err) {
        console.log("oh no, films error", err);
    }
});
exports.getFilms = getFilms;
