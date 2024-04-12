import { Schema, model, models } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: [true, 'Email already exists.'],
    },
    image: String,
    description: String,
    githubUrl: String,
    linkedinUrl: String,
  },
  { timestamps: true }
);

export const User = models.User || model('User', userSchema);
