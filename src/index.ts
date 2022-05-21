import cors from 'cors'
import express from 'express'
import rateLimit from 'express-rate-limit'
import autoRegisterRouter from './routers'

const app = express()
const PORT = process.env.PORT || 8080
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false
})

autoRegisterRouter(app)

app.use(cors())
app.use(limiter)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
