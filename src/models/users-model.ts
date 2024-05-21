import mongoose, { Schema, model } from "mongoose";
import { IFilm } from "./film-model";

interface IUser {
  username: string;
  password: string;
  email: string;
  films: IFilm;
  stats: {
    num_films_watched: number;
    hours_watched: number;
  };
}

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  films: { type: [Object], required: true },
  stats: { type: Object, required: true },
});

const User = mongoose.model("User", userSchema);

export { IUser, userSchema, User };