import { connectDB } from '@/utils/database';
import { Project } from '@/utils/models';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const GET = async (
  // Don't ask me why although req is not used, it is required for this API route to work
  req: Request,
  { params: { id } }: { params: { id: string } }
) => {
  try {
    await connectDB();

    const projects = await Project.findById(id).populate('creator');

    return new Response(JSON.stringify(projects), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Failed to fetch single project', { status: 500 });
  }
};

const isBase64DataURL = (data: string) => {
  const base64Regex = /^data:image\/[a-z]+;base64,/;
  return base64Regex.test(data);
};

export const PATCH = async (
  req: Request,
  { params: { id } }: { params: { id: string } }
) => {
  const { title, description, image, liveSiteUrl, githubUrl, category } =
    await req.json();

  if (
    !title ||
    !description ||
    !image ||
    !liveSiteUrl ||
    !githubUrl ||
    !category
  ) {
    return new Response('Missing required fields', { status: 400 });
  }

  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    transformation: [
      {
        width: 1000,
        height: 752,
        crop: 'scale',
      },
    ],
  };

  try {
    await connectDB();
    console.log('Connected to MongoDB');

    const existingProject = await Project.findById(id);

    if (!existingProject) {
      return new Response('Project not found', { status: 404 });
    }

    // Replacing the old data with the new data
    existingProject.title = title;
    existingProject.description = description;

    // If there's no new image, keep the existing image, no need update la
    if (isBase64DataURL(image)) {
      await cloudinary.uploader.upload(image, options);
      console.log('Image uploaded successfully');
      existingProject.image = image;
    }

    existingProject.liveSiteUrl = liveSiteUrl;
    existingProject.githubUrl = githubUrl;
    existingProject.category = category;

    await existingProject.save();
    console.log('Project updated successfully');

    return new Response('Project updated successfully', { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response('Failed to update project', { status: 500 });
  }
};

export const DELETE = async (
  // Don't ask me why although req is not used, it is required for this API route to work
  req: Request,
  { params: { id } }: { params: { id: string } }
) => {
  try {
    await connectDB();

    await Project.findByIdAndDelete(id);

    console.log('Project deleted successfully');
    return new Response('Project deleted successfully', { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Failed to delete project', { status: 500 });
  }
};
