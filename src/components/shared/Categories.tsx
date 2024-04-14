import { categoryFilters } from '@/constants';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';

const Categories = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const categoryParams = searchParams?.get('category');
  const handleTags = (category: string) => {
    router.push(`${pathName}?category=${category}`);
  };

  return (
    <Suspense>
      <div className='flexBetween w-full gap-5 flex-wrap'>
        <ul className='flex gap-2 overflow-auto'>
          {categoryFilters.map((category) => (
            <button
              key={category}
              type='button'
              onClick={() => handleTags(category)}
              className={`${
                categoryParams === category
                  ? 'bg-light-white-300 font-medium'
                  : 'font-normal'
              } px-4 py-3 rounded-lg capitalize whitespace-nowrap`}
            >
              {category}
            </button>
          ))}
        </ul>
      </div>
    </Suspense>
  );
};

export default Categories;
