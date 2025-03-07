require('dotenv').config()
const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const patientRoutes = require('./routes/patients')
const userRoutes = require('./routes/user')
const requireAuth = require('./middleware/requireAuth')
const adminAuth = require('./middleware/adminAuth')
const cors = require('cors')
// express app
const app = express()

// middleware
app.use(express.json())
app.use(cors({ origin: "*" })); // ✅ Allow all origins for testing

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
// Serve Frontend Files (Ensure path is correct)
const frontendPath = path.join(__dirname, "../frontend/");
app.use(express.static(frontendPath));

app.get("/", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.js"));
});

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
