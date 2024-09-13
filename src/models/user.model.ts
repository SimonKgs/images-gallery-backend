// user.model.ts
import mongoose, { Schema, Document } from 'mongoose';

import { User } from '../interfaces/user.interface';

const userSchema = new Schema<User>({
  username: { type: String, required: true, },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String },
  images: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const UserModel = mongoose.model<User>('User', userSchema);

export default UserModel;
