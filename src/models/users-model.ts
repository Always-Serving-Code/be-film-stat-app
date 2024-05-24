import mongoose, { Schema, model } from "mongoose";
import { IFilm } from "./film-model";

interface IUser {
  _id?: number;
  username: string;
  password: string;
  email: string;
  films: IFilm;
}

const userSchema = new Schema({
  _id: { type: Schema.Types.Mixed },
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  films: { type: [Object], required: true },
});

const User = mongoose.model("User", userSchema);

export { IUser, userSchema, User };
