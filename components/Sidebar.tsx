import React from 'react'
import {
  BellIcon,
  HashtagIcon,
  BookmarkIcon,
  CollectionIcon,
  DotsCircleHorizontalIcon,
  MailIcon,
  UserIcon,
  HomeIcon,
} from '@heroicons/react/outline'
import SidebarRow from './SidebarRow'
import { signIn, signOut, useSession } from 'next-auth/react'

const Sidebar = () => {
  const { data: session } = useSession()

  return (
    <div className='flex flex-col items-center col-span-2 px-4 md:items-start'>
      {/* could be Nextjs Image component here */}
      <img
        className='w-10 h-10 m-3'
        src='https://links.papareact.com/drq'
        alt='Twitter logo'
      />
      <SidebarRow Icon={HomeIcon} title={'Home'} />
      <SidebarRow Icon={HashtagIcon} title={'Explore'} />
      <SidebarRow Icon={BellIcon} title={'Notifications'} />
      <SidebarRow Icon={MailIcon} title={'Messages'} />
      <SidebarRow Icon={BookmarkIcon} title={'Bookmarks'} />
      <SidebarRow Icon={CollectionIcon} title={'Lists'} />
      <SidebarRow
        Icon={UserIcon}
        onClick={session ? signOut : signIn}
        title={session ? 'Sign Out' : 'Sign In'}
      />
      <SidebarRow Icon={DotsCircleHorizontalIcon} title={'More'} />
    </div>
  )
}

export default Sidebar
