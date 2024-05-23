"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Film = exports.filmSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const filmSchema = new mongoose_1.Schema({
    _id: Number,
    title: { type: String, required: true },
    directors: { type: [String], required: true },
    genres: { type: [String], required: true },
    release_year: { type: Number, required: true },
    synopsis: { type: String, required: true },
    poster_url: { type: String, required: true },
    lead_actors: { type: [String], required: true },
    runtime: { type: Number, required: true },
    date_watched: Date,
    rating: { type: Number, min: 1, max: 5 },
});
exports.filmSchema = filmSchema;
const Film = mongoose_1.default.model("Film", filmSchema);
exports.Film = Film;
