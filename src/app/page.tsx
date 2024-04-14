'use client';

import ProjectCard from '@/components/shared/ProjectCard';
import { ProjectInterface } from '@/utils/common.types';
import { useEffect, useState } from 'react';

const Home = () => {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    const res = await fetch('/api/project', { cache: 'no-store' });
    const data = await res.json();
    setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <section className='flex-start flex-col paddings mb-6'>
      <h1>Categories</h1>
      {projects.length !== 0 ? (
        <section className='projects-grid'>
          {projects?.map((project: ProjectInterface) => (
            <ProjectCard
              key={project?._id}
              project={project}
            />
          ))}
        </section>
      ) : (
        <section className='flexStart flex-col paddings'>
          <p className='no-result-text text-center'>No projects found</p>
        </section>
      )}

      <h1>Load More</h1>
    </section>
  );
};

export default Home;
