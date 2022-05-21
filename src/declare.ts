import User from './types/user'

export {}

declare global {
  namespace Express {
    interface Request {
      User: User
    }
  }
}
