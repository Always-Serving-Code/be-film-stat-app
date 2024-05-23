import mongoose, { Schema, model } from "mongoose";

interface IFilm {
  _id?: number;
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

const Film = mongoose.model("Film", filmSchema);

export { IFilm, filmSchema, Film };
