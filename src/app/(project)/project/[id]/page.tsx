/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import Modal from '@/components/shared/Modal';
import ProjectActions from '@/components/shared/ProjectActions';
import RelatedProjects from '@/components/shared/RelatedProjects';
import { ProjectInterface } from '@/utils/common.types';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

const Project = ({ params }: any) => {
  const searchParams = useSearchParams();
  const creator = searchParams.get('creator');
  const { data: session } = useSession();
  const [project, setProject] = useState<ProjectInterface>();

  useEffect(() => {
    const fetchSingleProject = async () => {
      const res = await fetch(`/api/project/${params.id}`, {
        cache: 'no-store',
      });

      if (!res.ok) {
        throw new Error('Failed to fetch project');
      }

      const data = await res.json();

      setProject(data);
    };
    if (params.id) {
      fetchSingleProject();
    }
  }, [params.id]);

  const renderLink = () => `/profile/${creator}`;

  return (
    <Suspense>
      <Modal>
        <section className='flexBetween gap-y-8 max-w-4xl max-xs:flex-col w-full'>
          <div className='flex-1 flex items-start gap-5 w-full max-xs:flex-col'>
            <Link href={renderLink()}>
              <Image
                src={project?.creator?.image ?? ''}
                width={50}
                height={50}
                alt='profile'
                className='rounded-full'
              />
            </Link>

            <div className='flex-1 flexStart flex-col gap-1'>
              <p className='self-start text-lg font-semibold'>
                {project?.title}
              </p>
              <div className='user-info'>
                <Link href={renderLink()}>{project?.creator?.name}</Link>
                <Image src='/dot.svg' width={4} height={4} alt='dot' />
                <Link
                  href={`/?category=${project?.category ?? ''}`}
                  className='text-primary-purple font-semibold'
                >
                  {project?.category}
                </Link>
              </div>
            </div>
          </div>

          {session?.user?.email === project?.creator?.email && (
            <div className='flex justify-end items-center gap-2'>
              <ProjectActions projectId={project?._id ?? ''} />
            </div>
          )}
        </section>

        <section className='mt-14'>
          <Image
            src={project?.image ?? ''}
            className='object-cover rounded-2xl'
            width={1064}
            height={798}
            alt='poster'
          />
        </section>

        <section className='flexCenter flex-col mt-20'>
          <p className='max-w-5xl text-xl font-normal'>
            {project?.description}
          </p>

          <div className='flex flex-wrap mt-5 gap-5'>
            <Link
              href={project?.githubUrl ?? ''}
              target='_blank'
              rel='noreferrer'
              className='flexCenter gap-2 tex-sm font-medium text-primary-purple'
            >
              🖥 <span className='underline'>Github</span>
            </Link>
            <Image src='/dot.svg' width={4} height={4} alt='dot' />
            <Link
              href={project?.liveSiteUrl ?? ''}
              target='_blank'
              rel='noreferrer'
              className='flexCenter gap-2 tex-sm font-medium text-primary-purple'
            >
              🚀 <span className='underline'>Live Site</span>
            </Link>
          </div>
        </section>

        <section className='flexCenter w-full gap-8 mt-28'>
          <span className='w-full h-0.5 bg-light-white-200' />
          <Link href={renderLink()} className='min-w-[82px] h-[82px]'>
            <Image
              src={project?.creator?.image ?? ''}
              className='rounded-full'
              width={82}
              height={82}
              alt='profile image'
            />
          </Link>
          <span className='w-full h-0.5 bg-light-white-200' />
        </section>

        <RelatedProjects
          user={project?.creator ?? { _id: '', name: '', image: '', email: '' }}
          projectId={project?._id ?? ''}
        />
      </Modal>
    </Suspense>
  );
};

export default Project;
