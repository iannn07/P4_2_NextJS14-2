import { ProjectCardProps } from '@/utils/common.types';
import Image from 'next/image';
import Link from 'next/link';

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { _id, title, image } = project;
  const creatorImage = project.creator.image;
  const creatorName = project.creator.name;
  const creatorId = project.creator._id;
  const randomLikes = Math.floor(Math.random() * 10000);
  const randomViews = String(
    (Math.floor(Math.random() * 10000) / 1000).toFixed(1) + 'K'
  );

  return (
    <div className='flexCenter flex-col rounded-2xl drop-shadow-card'>
      <Link
        href={`/project/${_id}?creator=${creatorId}`}
        className='flexCenter group relative w-full h-full'
      >
        <Image
          src={image}
          className='w-full h-full object-cover rounded-2xl'
          alt='project image'
          width={414}
          height={314}
        />
        <div className='hidden group-hover:flex profile_card-title'>
          <p className='w-full'>{title}</p>
        </div>
      </Link>

      <div className='flexBetween w-full px-2 mt-3 font-semibold text-sm'>
        <Link href={`/profile/${creatorId}`}>
          <div className='flexCenter gap-2'>
            <Image
              src={creatorImage}
              className='rounded-full'
              alt='creator image'
              width={24}
              height={24}
            />
            <p className='creator-name'>{creatorName}</p>
          </div>
        </Link>

        <div className='flexCenter gap-6'>
          <div className='flexCenter gap-1'>
            <Image src={'/heart.svg'} alt='heart' width={13} height={12} />
            <p className='text-sm'>{randomLikes}</p>
          </div>
          <div className='flexCenter gap-1'>
            <Image src={'/eye.svg'} alt='eye' width={12} height={9} />
            <p className='text-sm'>{randomViews}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
