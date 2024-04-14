import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const ProjectActions = ({ projectId }: { projectId: string }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDeleteProject = async () => {
    try {
      setIsDeleting(true);

      const res = await fetch(`/api/project/${projectId}`, {
        method: 'DELETE', cache: 'no-store'
      });

      if (res.ok) {
        setIsDeleting(false);
        router.push('/');
      }
    } catch (error) {
      console.log(error);
      throw new Error('Failed to delete project');
    }
  };

  return (
    <>
      <Link
        href={`/edit-project/${projectId}`}
        className='flexCenter edit-action_btn'
      >
        <Image src='/pencil.svg' width={20} height={20} alt='edit' />
      </Link>

      <button
        type='button'
        onClick={handleDeleteProject}
        className={`flexCenter delete-action_btn ${
          isDeleting ? 'bg-gray' : 'bg-primary-purple'
        }`}
      >
        <Image src='/trash.svg' width={20} height={20} alt='delete' />
      </button>
    </>
  );
};

export default ProjectActions;
