import mongoose, { Schema, model } from "mongoose";

interface IFilm {
  _id?: string;
  title: string;
  directors: string[];
  genres: string[];
  release_year: string;
  synopsis: string;
  poster_url: string;
  lead_actors: string[];
  runtime: number;
  date_watched?: any;
  rating?: number;
}

const filmSchema = new Schema({
  _id: String,
  title: { type: String, required: true },
  directors: { type: [String], required: true },
  genres: { type: [String], required: true },
  release_year: { type: Number, required: true },
  synopsis: { type: String, required: true },
  poster_url: { type: String, required: true },
  lead_actors: { type: [String], required: true },
  runtime: { type: Number, required: true },
  date_watched: { type: Date, default: Date.now },
  rating: Number
});

const Film = mongoose.model("Film", filmSchema);

export { IFilm, filmSchema, Film };
