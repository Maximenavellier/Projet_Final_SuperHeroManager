import { Schema, model, Document } from 'mongoose';

export interface IHero extends Document {
  nom: string;
  alias: string;
  univers: string;
  pouvoirs: string[];
  description: string;
  image: string;
  auteur?: Schema.Types.ObjectId;
}

const HeroSchema = new Schema({
  nom: { type: String, required: true },
  alias: { type: String, required: true },
  univers: { type: String, required: true },
  pouvoirs: [{ type: String }],
  description: { type: String, required: true },
  image: { type: String, required: true },
  auteur: { type: Schema.Types.ObjectId, ref: 'User', required: false },
});

export default model<IHero>('Hero', HeroSchema);