'use client';

import Categories from '@/components/shared/Categories';
import ProjectCard from '@/components/shared/ProjectCard';
import { ProjectInterface } from '@/utils/common.types';
import { Suspense, useEffect, useState } from 'react';

type Props = {
  searchParams: {
    category?: string;
  };
};

const Home = ({ searchParams: { category } }: Props) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      let url = '/api/project';
      if (category) {
        url = `/api/project/categories/${category}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      setProjects(data);
    };

    fetchProjects();
  }, [category]);

  return (
    <section className='flex-start flex-col paddings mb-6'>
      <Suspense>
        <Categories />
      </Suspense>

      {projects.length !== 0 ? (
        <section className='projects-grid'>
          {projects?.map((project: ProjectInterface) => (
            <ProjectCard key={project?._id} project={project} />
          ))}
        </section>
      ) : (
        <section className='flexStart flex-col paddings'>
          <p className='no-result-text text-center'>No projects found</p>
        </section>
      )}
    </section>
  );
};

export default Home;
