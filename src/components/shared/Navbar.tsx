'use client'
import { NavLinks } from '@/constants';
// import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import AuthProviders from '../auth/AuthProviders';
import { useSession } from 'next-auth/react';

const Navbar = () => {
  const {data: session} = useSession();
  // const session = null;

  return (
    <nav className='flexBetween navbar'>
      <div className='flex-1 flexStart gap-10'>
        <Link href={'/'}>
          <Image src={'/logo.svg'} alt='logo' width={50} height={50} />
        </Link>
        <ul className='xl:flex hidden text-small gap-7'>
          {NavLinks.map(({ href, key, text }) => (
            <li
              key={key}
              className='hover:text-accent transition-all duration-300'
            >
              <Link href={href}>{text}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className='flexCenter gap-4'>
        {session ? (
          <>
            <Link href={'/create-project'}>Share Yours!</Link>
          </>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
