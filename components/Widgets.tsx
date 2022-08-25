import { SearchIcon } from '@heroicons/react/outline';
import React from 'react';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

const Widgets = () => {
  return (
    // todo component should scroll independently but does not
    <div className='hidden col-span-2 px-2 mt-2 lg:inline'>
      {/* Search */}
      <div className='flex items-center p-3 mt-2 mb-3 space-x-2 bg-gray-100 rounded-full'>
        <SearchIcon className='w-5 h-5 text-gray-400' />
        <input
          className='flex-1 bg-transparent outline-none'
          type='text'
          placeholder='Search Twitter'
        />
      </div>
      <TwitterTimelineEmbed
        sourceType='profile'
        screenName='sonnysangha'
        options={{ height: 1000 }}
      />
    </div>
  );
};

export default Widgets;
