import { connectDB } from '@/utils/database';
import { Project } from '@/utils/models';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const POST = async (req: Request) => {
  const {
    title,
    description,
    image,
    liveSiteUrl,
    githubUrl,
    category,
    creator,
  } = await req.json();

  if (
    !title ||
    !description ||
    !image ||
    !liveSiteUrl ||
    !githubUrl ||
    !category ||
    !creator
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

    const newProject = new Project({
      title: title,
      description: description,
      image: image,
      liveSiteUrl: liveSiteUrl,
      githubUrl: githubUrl,
      category: category,
      creator: creator,
    });

    await cloudinary.uploader.upload(image, options);
    console.log('Image uploaded successfully');

    await newProject.save();
    console.log('Project created successfully');

    // console.log(
    //   JSON.stringify({
    //     title,
    //     description,
    //     liveSiteUrl,
    //     githubUrl,
    //     category,
    //     creator,
    //   })
    // );

    return new Response('Project created successfully', { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response('Failed to create project', { status: 500 });
  }
};
