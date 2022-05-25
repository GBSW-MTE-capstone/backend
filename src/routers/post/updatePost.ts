import db from '../../modules/db'

interface UpdatePostInput {
  title: string
  desc?: string
  body: string
}

const updatePost = async (id: string, body: UpdatePostInput) => {
  const post = await db('post').where({ nid: id }).first()
  if (!post) return { success: false, message: 'Post not found' }

  const { title, desc, body: content } = body
  const updatedPost = await db('post')
    .where({ nid: id })
    .update({ title, desc, body: content, updatedAt: new Date() })
    .catch(err => { return { message: err.message, success: false } }) as any

  if (updatedPost.success === false) return { success: false, updatedPost, message: 'database connection error' }

  return { success: true, message: 'Post updated', data: updatedPost }
}

export default updatePost
