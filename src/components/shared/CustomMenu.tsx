import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment } from "react";

type Props = {
  title: string;
  state?: string;
  filters: string[];
  // eslint-disable-next-line no-unused-vars
  setState: (value: string) => void;
};

const CustomMenu = ({ title, state, filters, setState }: Props) => {
  return (
    <div className='flexStart flex-col w-full gap-7 relative'>
      <label htmlFor={title} className='w-full text-gray-100'>
        {title}
      </label>
      <Menu as='div' className='self-start relative'>
        <div>
          <Menu.Button className='flexCenter custom_menu-btn'>
            {state || 'Web Development'}
            <Image
              src='/arrow-down.svg'
              width={10}
              height={5}
              alt='arrow down'
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='flexStart custom_menu-items'>
            {filters.map((category) => (
              <Menu.Item key={category}>
                <button
                  type='button'
                  value={category}
                  className='custom_menu-item'
                  onClick={(e) => setState(e.currentTarget.value)}
                >
                  {category}
                </button>
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default CustomMenu;
