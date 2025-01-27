require('express-async-errors')
require('dotenv/config')

const AppError = require('./utils/AppError')
const migrationsRun = require('./database/sqlite/migrations')
const uploadConfig = require('./configs/upload')
const routes = require('./routes')

const cors = require('cors')
const express = require('express')

const app = express()
app.use(cors())
migrationsRun()

app.use(express.json())
app.use('/files', express.static(uploadConfig.UPLOADS_FOLDER))
app.use(routes)

app.use((error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message
    })
  }

  console.error(error)

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log('Server started on port: ' + PORT))

