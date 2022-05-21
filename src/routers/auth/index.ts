import { Router } from 'express'
import authMiddleware from '../../modules/auth'
const router = Router()

router.use('/', authMiddleware)
router.get('/', (req, res) => {
  console.log(req.user)
  res.send('auth')
})

export default router
