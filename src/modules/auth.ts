import type { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import User from 'types/user'
import db from './db'

const jwtSecret = process.env.JWT_SECRET || 'secret'
const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers
  if (!authorization) return unAuthorized(res)

  const token = authorization.split(' ')[1]
  if (!token) return unAuthorized(res)

  try {
    const decoded = verify(token, jwtSecret) as { id: string }
    if (!decoded) return unAuthorized(res)

    const user = await db('users').where({ id: decoded.id }).first() as User
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        success: false
      })
    }

    req.user = user
    return next()
  } catch (err) {
    return unAuthorized(res)
  }
}

const unAuthorized = (res: Response) => {
  return res.status(401).json({
    message: 'Unauthorized',
    success: false
  })
}

export default authMiddleware
