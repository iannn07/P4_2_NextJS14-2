'use client';

import Modal from '@/components/shared/Modal';
import ProjectForm from '@/components/shared/ProjectForm';
import { ProjectInterface } from '@/utils/common.types';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const EditProject = ({ params: { id } }: { params: { id: string } }) => {
  const { data: session } = useSession();
  const [project, setProject] = useState<ProjectInterface>();

  if (!session?.user) {
    redirect('/');
  }

  useEffect(() => {
    const fetchProject = async () => {
      const res = await fetch(`/api/project/${id}`, { cache: 'no-store' });

      if (!res.ok) {
        throw new Error('Failed to fetch project');
      }

      const data = await res.json();
      setProject(data);
    };
    if (id) {
      fetchProject();
    }
  }, [id]);

  return (
    <Modal>
      <h3 className='modal-head-text'>Edit Project</h3>
      <ProjectForm type='edit' session={session} project={project} />
    </Modal>
  );
};

export default EditProject;
