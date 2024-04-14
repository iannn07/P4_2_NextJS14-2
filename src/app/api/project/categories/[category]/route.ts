import { connectDB } from '@/utils/database';
import { Project } from '@/utils/models';

export const GET = async (
  req: Request,
  { params: { category } }: { params: { category: string } }
) => {
  try {
    await connectDB();

    const projects = await Project.find({ category }).populate('creator');

    return new Response(JSON.stringify(projects), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Failed to fetch projects', { status: 500 });
  }
};
