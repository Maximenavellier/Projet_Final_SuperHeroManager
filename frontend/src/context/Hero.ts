import mongoose, { Schema, Document } from 'mongoose';

export interface IHero extends Document {
  nom: string;
  alias: string;
  univers: string;
  pouvoirs: string[];
  description: string;
  image: string;
  auteur?: mongoose.Types.ObjectId;
}

const HeroSchema: Schema = new Schema({
  nom: { type: String, required: true },
  alias: { type: String, required: true },
  univers: { type: String, required: true },
  pouvoirs: { type: [String], required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  auteur: { type: Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.model<IHero>('Hero', HeroSchema);