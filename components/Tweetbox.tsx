import {
  CalendarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  SearchIcon,
} from '@heroicons/react/outline';
import React, { useState } from 'react';

const Tweetbox = () => {
  const [input, setInput] = useState<string>('');
  return (
    <div className='flex p-5 space-x-2'>
      <img
        className='object-cover mt-4 rounded-full h-14 w-14 '
        src='https://links.papareact.com/gll'
        alt=''
      />
      <div className='flex items-center flex-1 pl-2'>
        <form className='flex flex-col flex-1'>
          <input
            className='w-full h-24 text-xl outline-none placeholder:text-xl'
            onChange={(e) => setInput(e.target.value)}
            type='text'
            placeholder="What's Happening?"
          />
          <div className='flex items-center'>
            <div className='flex flex-1 space-x-2 text-twitter'>
              <PhotographIcon className='w-5 h-5 transition-transform duration-150 ease-out cursor-pointer hover:scale-150 ' />
              <SearchIcon className='w-5 h-5' />
              <EmojiHappyIcon className='w-5 h-5' />
              <CalendarIcon className='w-5 h-5' />
              <LocationMarkerIcon className='w-5 h-5' />
            </div>
            <button
              className='px-5 py-2 font-bold text-white rounded-full disabled:opacity-40 bg-twitter '
              disabled={!input}
            >
              Tweet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Tweetbox;
