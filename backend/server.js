const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5000
const app = express()

// Connect to database
connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use(errorHandler)

app.get('/', (req, res) => {
  res.send('Hello')
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
