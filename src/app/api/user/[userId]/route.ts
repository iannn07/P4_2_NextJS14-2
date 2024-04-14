import { connectDB } from '@/utils/database';
import { Project } from '@/utils/models';

export const GET = async (
  // Don't ask me why although req is not used, it is required for this API route to work
  req: any,
  { params: { userId } }: { params: { userId: string } }
) => {
  try {
    await connectDB();

    const projects = await Project.find({ creator: userId }).populate(
      'creator'
    );

    if (!projects || projects.length === 0) {
      return new Response(JSON.stringify('No projects found'), { status: 404 });
    }

    return new Response(JSON.stringify(projects), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Failed to fetch single project', { status: 500 });
  }
};
