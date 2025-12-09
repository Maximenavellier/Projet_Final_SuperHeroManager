import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  passwordHash: string;
  role: string;
  createdAt: Date; // Ajout du typage
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  // Le rôle par défaut est 'visitor' selon le PDF pour limiter les accès au début
  role: { type: String, enum: ['admin', 'editor', 'visitor', 'user'], default: 'visitor' } 
}, {
  timestamps: true // <--- C'EST ICI QUE LA MAGIE OPÈRE POUR LA DATE
});

export default mongoose.model<IUser>('User', UserSchema);