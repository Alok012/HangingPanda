import Link from 'next/link';
import React from 'react';

const Header: React.FC = () => {
  return (
    <div>
      <div className="flex p-3 bg-black text-white">
        <h3 className='text-2xl'>E- commerce</h3>
        <div className='flex ml-auto mr-auto gap-6'>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/services">Services</Link>
        </div>
        <div className='mr-5'>
            <Link href="/profile">Profile</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
