import db from '../../modules/db'

interface CreatePostInput {
  title: string
  desc?: string
  body: string
}

const createPost = async (uid: string, type: number, body: CreatePostInput) => {
  const { title, desc, body: content } = body
  if (!title || !content) return { message: 'title or body is empty', success: false }

  const post = await db('post').insert({ title, desc, body: content, type, uid })
    .catch(err => { return { message: err.message, success: false } }) as any

  if (post.success === false) return { message: 'database connection error', post, success: false }

  return { success: true, post }
}

export default createPost
