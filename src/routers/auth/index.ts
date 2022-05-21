import { Router } from 'express'
import authMiddleware from '../../modules/auth'
import passport from 'passport'
import { Strategy } from 'passport-kakao'
import db from '../../modules/db'
import User from '../../types/user'
const router = Router()

passport.use(new Strategy({
  clientID: process.env.KAKAO_CLIENT_ID || '8cd09cc8040d1f465d0d75492856fd38',
  callbackURL: process.env.KAKAO_CALLBACK_URL || 'http://localhost:8080/auth/callback',
  clientSecret: process.env.KAKAO_CLIENT_SECRET || '1mCwnZ2D5D52JznBs1WsU0imBWDtInsR'
}, async (accessToken: string, refreshToken: string, profile: any, done: any) => {
  const {
    _json: {
      id,
      properties: {
        nickname,
        profile_image: profileImage
      },
      kakao_account: { email }
    }
  } = profile

  const user = await db('users').where({ uid: id }).first() as User
  if (!user) {
    await db('users').insert({ uid: id, nickname, profile: profileImage, email })
  }

  done(null, id)
}))

router.get('/login', passport.authenticate('kakao'))
router.get('/callback', passport.authenticate('kakao', {
  failureRedirect: '/'
}), (req, res) => {
  res.redirect('/')
})

router.use(authMiddleware)
router.get('/', (req, res) => {
  res.json(req.user)
})

export default router
