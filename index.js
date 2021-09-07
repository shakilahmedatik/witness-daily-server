//Import Modules
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
const cors = require('cors')
require('dotenv').config()

//Routes
const articleRoutes = require('./routes/articles')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')

//Initialize App
const app = express()

// middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(expressValidator())
app.use(cors())

//Connect Database
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to mongoDB...'))
  .catch(err => console.error(err))

//Routes middleware
app.use('/api', articleRoutes)
app.use('/api', userRoutes)
app.use('/api', categoryRoutes)

//Initialize Server
const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})
