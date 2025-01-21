const mongoose = require('mongoose')

const Schema = mongoose.Schema

const patientSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  place: {
    type: String,
    required: true
  },
  disease: {
    type: String,
    required: true
  },
  bloodgroup: {
    type: String,
    required: true
  },
  specialist: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

const Patient = mongoose.model('Patient', patientSchema)
module.exports = Patient