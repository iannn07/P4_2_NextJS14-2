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
    image: String
  },
  { timestamps: true }
);

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required.'],
    },
    description: {
      type: String,
      required: [true, 'Description is required.'],
    },
    image: {
      type: String,
      required: [true, 'Image is required.'],
    },
    liveSiteUrl: {
      type: String,
      required: [true, 'Live site URL is required.'],
    },
    githubUrl: {
      type: String,
      required: [true, 'Github URL is required.'],
    },
    category: {
      type: String,
      required: [true, 'Category is required.'],
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }
  }
);

export const User = models.User || model('User', userSchema);
export const Project = models.Project || model('Project', projectSchema);
