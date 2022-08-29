import {
  ChatAlt2Icon,
  HeartIcon,
  SwitchHorizontalIcon,
  UploadIcon,
} from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import TimeAgo from 'react-timeago'
import { Comment, CommentBody, Tweet } from '../typings'
import { fetchComments } from '../utils/fetchComments'

interface Props {
  tweet: Tweet
}

const Tweet = ({ tweet }: Props) => {
  const [comments, setComments] = useState<Comment[]>([])
  const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false)
  const [input, setInput] = useState<string>('')

  const { data: session } = useSession()

  const refreshComments = async () => {
    const comments: Comment[] = await fetchComments(tweet._id)
    setComments(comments)
  }

  useEffect(() => {
    refreshComments()
  }, [])

  const handleSubmit = async (
    e: React.MouseEvent<HTMLFormElement, MouseEvent>
  ) => {
    e.preventDefault()
    const commentToast = toast.loading('Posting Comment...')

    // Comment logic
    const commentInfo: CommentBody = {
      text: input,
      tweetId: tweet._id,
      username: session?.user?.name || 'Unknown User',
      profileImg: session?.user?.image || 'https://links.papareact.com/gll',
    }

    const result = await fetch(`/api/addComment`, {
      body: JSON.stringify(commentInfo),
      method: 'POST',
    })

    console.log('WOOHOO we made it', result)
    toast.success('Comment Posted!', {
      id: commentToast,
    })

    setInput('')
    setCommentBoxVisible(false)
    refreshComments()
  }

  return (
    <div
      className='flex flex-col p-5 space-x-3 border-gray-100 border-y'
      key={tweet._id}
    >
      <div className='flex space-x-3'>
        <img
          className='object-cover w-10 h-10 rounded-full'
          src={tweet.profileImg || 'https://links.papareact.com/gll'}
          alt=''
        />
        <div>
          <div className='flex items-center space-x-1'>
            <p className='mr-1 font-bold'>{tweet.username} </p>
            <p className='hidden text-sm text-gray-500 sm:inline'>
              @{tweet.username.replace(/\s+/g, '').toLowerCase()} |
            </p>
            <TimeAgo
              className='text-sm text-gray-500'
              date={tweet._createdAt}
            />
          </div>

          <p className='pt-1'>{tweet.text}</p>
          {tweet.image && (
            <img
              className='object-cover m-5 mb-1 ml-0 rounded-lg shadow-sm max-h-60'
              src={tweet.image}
              alt=''
            />
          )}
        </div>
      </div>
      <div className='flex justify-between mt-5'>
        <div
          className='flex items-center space-x-3 text-gray-400 cursor-pointer'
          onClick={() => session && setCommentBoxVisible(!commentBoxVisible)}
        >
          <ChatAlt2Icon className='w-5 h-5' />
          <p>{comments.length}</p>
        </div>
        <div className='flex items-center space-x-3 text-gray-400 cursor-pointer'>
          <SwitchHorizontalIcon className='w-5 h-5' />
        </div>
        <div className='flex items-center space-x-3 text-gray-400 cursor-pointer'>
          <HeartIcon className='w-5 h-5' />
        </div>
        <div className='flex items-center space-x-3 text-gray-400 cursor-pointer'>
          <UploadIcon className='w-5 h-5' />
        </div>
      </div>

      {/* Comment Box Logic */}
      {commentBoxVisible && (
        <form className='flex mt-3 space-x-3' onSubmit={handleSubmit}>
          <input
            className='flex-1 p-2 bg-gray-100 rounded-lg outline-none'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type='text'
            placeholder='Write a comment...'
          />
          <button
            className='text-twitter disabled:text-gray-200'
            disabled={!input}
            type='submit'
          >
            Post
          </button>
        </form>
      )}

      {comments?.length > 0 && (
        <div className='p-5 my-2 mt-5 space-y-5 overflow-y-scroll border-t border-gray-100 max-h-44'>
          {comments.map((comment) => (
            <div className='relative flex space-x-2' key={comment._id}>
              <hr className='absolute h-8 left-5 top-10 border-x border-twitter/20' />
              <img
                className='object-cover mt-2 rounded-full h-7 w-7'
                src={comment.profileImg}
                alt=''
              />
              <div>
                <div className='flex items-center space-x-1'>
                  <p className='mr-1 font-bold'>{comment.username}</p>
                  <p className='hidden text-sm text-gray-500 lg:inline'>
                    @{comment.username.replace(/\s+/g, '').toLowerCase()} |
                  </p>
                  <TimeAgo
                    className='text-sm text-gray-500'
                    date={comment._createdAt}
                  />
                </div>
                <p>{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Tweet
