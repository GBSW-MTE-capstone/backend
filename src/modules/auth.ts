import type { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

const jwtSecret = process.env.JWT_SECRET || 'secret'
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers
  if (!authorization) {
    return res.status(401).json({
      message: 'Unauthorized',
      success: false
    })
  }

  const token = authorization.split(' ')[1]
  if (!token) {
    return res.status(401).json({
      message: 'Unauthorized',
      success: false
    })
  }

  try {
    const decoded = verify(token, jwtSecret) as { id: string }
    if (!decoded) {
      return res.status(401).json({
        message: 'Unauthorized',
        success: false
      })
    }

    req.user = decoded
    return next()
  } catch (err) {
    return res.status(401).json({
      message: 'Unauthorized',
      success: false
    })
  }
}

export default authMiddleware
