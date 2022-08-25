import React from 'react';
import { RefreshIcon } from '@heroicons/react/outline';
import Tweetbox from './Tweetbox';

const Feed = () => {
  return (
    <div className='col-span-7 lg:col-span-5 border-x'>
      <div className='flex items-center justify-between'>
        <h1 className='p-5 text-xl font-bold bp-0'>Home</h1>
        <RefreshIcon className='w-8 h-8 mt-5 mr-5 transition-all duration-500 ease-out cursor-pointer text-twitter hover:rotate-180 active:scale-125' />
      </div>
      <div>
        <Tweetbox />
      </div>
    </div>
  );
};

export default Feed;
