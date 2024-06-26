import React from 'react';
import Image from 'next/image';
import Button from './Button';
import Link from 'next/link';
import ProjectCard from './ProjectCard';
import { ProjectInterface } from '@/utils/common.types';

const ProfilePage = ({
  projects,
  user,
}: {
  projects: ProjectInterface[];
  user: ProjectInterface;
}) => {
  return (
    <section className='flexCenter flex-col max-w-10xl w-full mx-auto paddings'>
      <section className='flexBetween max-lg:flex-col gap-10 w-full'>
        <div className='flex items-start flex-col w-full'>
          <Image
            src={user?.creator.image}
            width={100}
            height={100}
            className='rounded-full'
            alt='user image'
          />
          <p className='text-4xl font-bold mt-10'>{user?.creator?.name}</p>
          <p className='md:text-5xl text-3xl font-extrabold md:mt-10 mt-5 max-w-lg'>
            Anything bro, I&apos;m tired 😔
          </p>

          <div className='flex mt-8 gap-5 w-full flex-wrap'>
            <Button
              title='Follow'
              leftIcon='/plus-round.svg'
              bgColor='bg-light-white-400 !w-max'
              textColor='text-black-100'
            />
            <Link href={`mailto:${user?.creator.email}`}>
              <Button title='Hire Me' leftIcon='/email.svg' />
            </Link>
          </div>
        </div>

        {projects?.length > 0 ? (
          <Image
            src={user?.image}
            alt='project image'
            width={739}
            height={554}
            className='rounded-xl object-contain'
          />
        ) : (
          <Image
            src='/profile-post.png'
            width={739}
            height={554}
            alt='project image'
            className='rounded-xl'
          />
        )}
      </section>

      <section className='flexStart flex-col lg:mt-28 mt-16 w-full'>
        <p className='w-full text-left text-lg font-semibold'>Recent Work</p>

        <div className='profile_projects'>
          {projects?.map((project) => (
            <ProjectCard
              key={`${project?._id}`}
              project={project}
            />
          ))}
        </div>
      </section>
    </section>
  );
};

export default ProfilePage;
