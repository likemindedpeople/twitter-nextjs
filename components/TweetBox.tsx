import {
  CalendarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  SearchIcon,
} from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import React, { useRef, useState, Dispatch, SetStateAction } from 'react'
import toast from 'react-hot-toast'
import { Tweet, TweetBody } from '../typings'
import { fetchTweets } from '../utils/fetchTweets'

interface Props {
  setTweets: React.Dispatch<React.SetStateAction<Tweet[]>>
}

const Tweetbox = ({ setTweets }: Props) => {
  const [input, setInput] = useState<string>('')
  const [image, setImage] = useState<string>('')

  const imageInputRef = useRef<HTMLInputElement>(null)

  const { data: session } = useSession()
  const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<Boolean>(false)

  const addImageToTweet = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()

    if (!imageInputRef.current?.value) return

    setImage(imageInputRef.current.value)
    imageInputRef.current.value = ''
    setImageUrlBoxIsOpen(false)
  }

  const postTweet = async () => {
    const tweetInfo: TweetBody = {
      text: input,
      username: session?.user?.name || 'Unknown User',
      profileImg: session?.user?.image || 'https://links.papareact.com/gll',
      image: image,
    }

    const result = await fetch(`api/addTweet`, {
      body: JSON.stringify(tweetInfo),
      method: 'POST',
    })

    const json = await result.json()

    const newTweets = await fetchTweets()
    setTweets(newTweets)

    toast('Tweet Posted!', {
      icon: '🚀',
      // id: tweetToast
    })

    return json
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    // const tweetToast = toast.loading('Posting Tweet...')

    postTweet()

    setInput('')
    setImage('')
    setImageUrlBoxIsOpen(false)
  }

  return (
    <div className='flex p-5 space-x-2'>
      <img
        className='object-cover mt-4 rounded-full h-14 w-14 '
        src={session?.user?.image || 'https://links.papareact.com/gll'}
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
              <PhotographIcon
                className='w-5 h-5 transition-transform duration-150 ease-out cursor-pointer hover:scale-150 '
                onClick={() => setImageUrlBoxIsOpen(!imageUrlBoxIsOpen)}
              />
              <SearchIcon className='w-5 h-5' />
              <EmojiHappyIcon className='w-5 h-5' />
              <CalendarIcon className='w-5 h-5' />
              <LocationMarkerIcon className='w-5 h-5' />
            </div>
            <button
              className='px-5 py-2 font-bold text-white rounded-full disabled:opacity-40 bg-twitter '
              disabled={!input || !session}
              onClick={handleSubmit}
            >
              Tweet
            </button>
          </div>

          {imageUrlBoxIsOpen && (
            <form className='flex px-4 py-2 mt-5 rounded-lg bg-twitter/70'>
              <input
                className='flex-1 p-2 text-white bg-transparent outline-none placeholder:text-white'
                type='text'
                placeholder='Enter an Image URL...'
                ref={imageInputRef}
              />
              <button
                className='font-bold text-white'
                type='submit'
                onClick={addImageToTweet}
              >
                Add Image
              </button>
            </form>
          )}

          {image && (
            <img
              className='object-contain w-full h-40 mt-10 shadow-lg rounded-xl'
              src={image}
              alt=''
            />
          )}
        </form>
      </div>
    </div>
  )
}

export default Tweetbox
