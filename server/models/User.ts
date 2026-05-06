import { Schema, model, models, Document } from 'mongoose';

export type UserRole = 'Patient' | 'Doctor' | 'Pharmacy' | 'Clinic' | 'Delivery';

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, index: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['Patient', 'Doctor', 'Pharmacy', 'Clinic', 'Delivery'] },
    avatar: { type: String },
  },
  {
    timestamps: true,
  },
);

const User = models.User || model<UserDocument>('User', userSchema);
export default User;
