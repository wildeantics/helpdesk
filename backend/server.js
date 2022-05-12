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
app.use('/api/tickets', require('./routes/ticketRoutes'))
app.use(errorHandler)

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Support Desk API' })
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
