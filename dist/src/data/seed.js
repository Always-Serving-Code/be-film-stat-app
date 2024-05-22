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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const film_model_1 = require("../models/film-model");
const film_data_json_1 = __importDefault(require("./film-data.json"));
const users_model_1 = require("../models/users-model");
const users_data_json_1 = __importDefault(require("./users-data.json"));
dotenv_1.default.config();
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(process.env.ATLAS_URI);
        console.log("Connected <3");
    }
    catch (_a) {
        console.log("nooo seed gone wrong :(");
    }
});
const seedDB = () => __awaiter(void 0, void 0, void 0, function* () {
    yield users_model_1.User.deleteMany({});
    yield film_model_1.Film.deleteMany({});
    yield users_model_1.User.insertMany(users_data_json_1.default);
    yield film_model_1.Film.insertMany(film_data_json_1.default);
});
const seed = () => __awaiter(void 0, void 0, void 0, function* () {
    yield connect();
    yield seedDB();
    yield mongoose_1.default.connection.close();
});
exports.default = seed;
