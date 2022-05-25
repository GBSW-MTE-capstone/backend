import db from '../../modules/db'

const getPost = async (type: number, id?: string) => {
  const post = await db('post').where(!id ? { type } : { type, nid: id })
    .catch(err => { return { message: err.message, success: false } }) as any

  if (post.error) return { message: 'database connection error', success: false }
  if (id) {
    db('post').where({ nid: id }).increment('views', 1)
  }

  return { success: true, data: post }
}

export default getPost
