import Image from 'next/image';
import FooterColumn from './FooterColumn';
import { footerLinks } from '@/constants';

const Footer = () => {
  return (
    <footer className='flexStart footer'>
      <div className='flex flex-col gap-12 w-full'>
        <div className='flex items-start flex-col'>
          <Image src='/logo.svg' width={50} height={50} alt='logo' />
          <p className='text-start text-sm font-normal mt-5 max-w-xl'>
            Gaussible is the world&apos;s leading community for creatives to
            share, learn, and grow. Showcase your projects with Gaussible.
          </p>
        </div>
        <div className='flex flex-wrap gap-12'>
          {/* First Column */}
          <FooterColumn
            title={footerLinks[0].title}
            links={footerLinks[0].links}
          />

          {/* Second Column */}
          <div className='flex-1 flex flex-col gap-4'>
            <FooterColumn
              title={footerLinks[1].title}
              links={footerLinks[1].links}
            />
            <FooterColumn
              title={footerLinks[2].title}
              links={footerLinks[2].links}
            />
          </div>

          {/* Third Column */}
          <FooterColumn
            title={footerLinks[3].title}
            links={footerLinks[3].links}
          />

          {/* Fourth Column */}
          <div className='flex-1 flex flex-col gap-4'>
            <FooterColumn
              title={footerLinks[4].title}
              links={footerLinks[4].links}
            />
            <FooterColumn
              title={footerLinks[5].title}
              links={footerLinks[5].links}
            />
          </div>

          {/* Fifth Column */}
          <FooterColumn
            title={footerLinks[6].title}
            links={footerLinks[6].links}
          />
        </div>
      </div>

      <div className='flexBetween footer_copyright'>
        <p>&copy; 2024 Gaussible. All rights reserved</p>
        <p className='text-gray'>
          <span className='text-black font-semibold'>10,214</span> projects
          submitted
        </p>
      </div>
    </footer>
  );
};

export default Footer;
