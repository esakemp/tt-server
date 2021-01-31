import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import { initializeDatabaseConnection } from './database/connection'
import routes from './routes'

initializeDatabaseConnection()

const app = express()

app.use(cors())
app.use(bodyParser.json())
let BASE_URL = ''
routes(app, BASE_URL)

app.get('*', async (req, res) => {
  const results = { error: 'unknown endpoint' }
  res.status(404).json(results)
})

const PORT = '8080'

export const server = app.listen(PORT, () => console.log(`Backend listening on port ${PORT}!`))
process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Process terminated')
  })
})

export default app
