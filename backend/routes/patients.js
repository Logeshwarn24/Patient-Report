const express = require('express')
const {
  createPatient,
  getPatients,
  getPatient,
  deletePatient,
  updatePatient,
  searchPatient
} = require('../controllers/patientController')
//requireAuth product the api routes
const requireAuth = require('../middleware/requireAuth')
const router = express.Router()
//then use the requireAuth from require of all api router
router.use(requireAuth)
// GET all Patients
router.get('/', getPatients)
// get search patients
router.get('/:id', searchPatient)
//GET a single Patient
router.get('/:id', getPatient)

// POST a new Patient
router.post('/', createPatient)

// DELETE a Patient
router.delete('/:id', deletePatient)

// UPDATE a Patient
router.patch('/:id', updatePatient)


module.exports = router