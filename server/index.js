import express from 'express'
import routes from './routes/index.js'
import multiparty from 'connect-multiparty'
import path from 'path'
import url from 'url'
const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: false }))
app.use(multiparty({ uploadDir: 'uploads' }))
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'content-type')
  res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS')
  next()
})
routes(app)
const { PORT = 8001 } = process.env
app.listen(PORT, () => {
  console.log()
  console.log(` Server app running in port ${PORT}`)
  console.log()
  console.log(`  > Local: \x1b[36mhttp://localhost:\x1b[1m${PORT}/\x1b[0m`)
})
