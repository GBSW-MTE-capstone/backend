/* eslint @typescript-eslint/no-var-requires: 0 */
import path from 'path'
import fs from 'fs'

import type { Application } from 'express'

const autoRegisterRouter = (app: Application) => {
  const routersPath = path.join(__dirname)
  const routersDir = fs.readdirSync(routersPath)

  routersDir.forEach(router => {
    if (!fs.lstatSync(path.join(routersPath, router)).isDirectory()) return
    const routerPath = path.join(routersPath, router)
    const routerFile = fs.readdirSync(routerPath, 'utf8')

    routerFile.forEach(file => {
      if (file !== 'index.js') return
      const filePath = path.join(routerPath, file)
      const routerInstance = require(filePath).default

      app.use(`/${router}`, routerInstance)
    })
  })
}

export default autoRegisterRouter
