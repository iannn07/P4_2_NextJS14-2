'use client';

import { ProjectInterface, UserProps } from '@/utils/common.types';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Props = {
  user: UserProps;
  projectId: string;
};

const RelatedProjects = ({ user, projectId }: Props) => {
  const [filteredProject, setFilteredProject] = useState<ProjectInterface[]>(
    []
  );

  useEffect(() => {
    const fetchRelatedProjects = async () => {
      try {
        const res = await fetch(`/api/user/${user._id}`, {
          cache: 'no-store',
        });

        if (!res.ok) {
          throw new Error('Failed to fetch related projects');
        }

        const data = await res.json();
        const filterData = data.filter((project: ProjectInterface) => {
          return project._id !== projectId;
        });

        setFilteredProject(filterData);
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch related projects');
      }
    };

    if (user._id && projectId) {
      fetchRelatedProjects();
    }
  }, [user._id, projectId]);

  return (
    <section className='flex flex-col mt-32 w-full'>
      <div className='flexBetween'>
        <p className='text-base font-bold'>More by {user?.name}</p>
        <Link
          href={`/profile/${user._id}`}
          className='text-primary-purple text-base'
        >
          View All
        </Link>
      </div>

      <div className='related_projects-grid'>
        {filteredProject.length > 0 ? (
          filteredProject.map((filter, index) => (
            <div
              className='flexCenter related_project-card drop-shadow-card'
              key={index}
            >
              <Link
                href={`/project/${projectId}?creator=${user._id}`}
                className='flexCenter group relative w-full h-full'
              >
                <Image
                  src={filter?.image}
                  width={414}
                  height={314}
                  className='w-full h-full object-cover rounded-2xl'
                  alt='project image'
                />

                <div className='hidden group-hover:flex related_project-card_title'>
                  <p className='w-full'>{filter?.title}</p>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <section className='flexStart flex-col paddings'>
          <h3 className='no-result-text text-center'>No related projects found</h3>
        </section>
        )}
      </div>
    </section>
  );
};

export default RelatedProjects;
