import db from '../../modules/db'

const deletePost = async (id: string) => {
  await db('post').where({ nid: id }).del()
  await db('comment').where({ nid: id }).del()

  return { success: true }
}

export default deletePost
