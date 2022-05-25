import { json, Router } from 'express'
import User from 'types/user'
import createPost from './createPost'
import deletePost from './deletePost'
import getPost from './getPost'
import updatePost from './updatePost'
const router = Router()

router.use(json())
router.get('/', (req, res) => {
  res.send('Hello World!')
})

router.get('/:type', async (req, res) => {
  const { type } = req.params
  const { id } = req.query

  const posts = id
    ? await getPost(Number(type), id.toString())
    : await getPost(Number(type))
  res.json(posts)
})

router.post('/:type', async (req, res) => {
  const { type } = req.params
  const uid = '1'

  const post = await createPost(uid, Number(type), req.body)
  res.json(post)
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  if (!id) return res.status(400).json({ error: 'id is required' })

  const post = await deletePost(id)
  res.json(post)
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  if (!id) return res.status(400).json({ error: 'id is required' })

  const post = await updatePost(id, req.body)
  res.json(post)
})

export default router
