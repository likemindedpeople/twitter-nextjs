export default {
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    {
      name: 'text',
      title: 'Comment',
      type: 'string',
    },
    {
      name: 'username',
      title: 'Username',
      type: 'string',
    },
    {
      name: 'profileImg',
      title: 'Profile Image',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Tweet Image',
      type: 'string',
    },
    {
      name: 'tweet',
      title: 'tweet',
      description: 'Reference the tweet the comment is associated to:',
      type: 'reference',
      to: {
        type: 'tweet',
      },
    },
  ],
}
