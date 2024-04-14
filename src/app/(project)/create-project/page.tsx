'use client';

import Modal from '@/components/shared/Modal';
import ProjectForm from '@/components/shared/ProjectForm';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const CreateProject = () => {
  const { data: session } = useSession();

  if (!session?.user) {
    redirect('/');
  }

  return (
    <Modal>
      <h3 className='modal-head-text'>Create New Project</h3>

      <ProjectForm type='create' session={session} />
    </Modal>
  );
};

export default CreateProject;
