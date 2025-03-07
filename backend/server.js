require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const patientRoutes = require('./routes/patients')
const userRoutes = require('./routes/user')
const requireAuth = require('./middleware/requireAuth')
const adminAuth = require('./middleware/adminAuth')

// express app
const app = express()

// middleware
app.use(express.json())

// middleware to log requests
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/user', userRoutes)
app.use('/api/patients', patientRoutes)

// Admin routes, protected by requireAuth and adminAuth
app.use('/api/admin', requireAuth, adminAuth, (req, res) => {
  res.send('Admin access granted')
})

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })
