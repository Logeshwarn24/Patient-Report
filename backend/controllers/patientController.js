const Patient = require('./../models/patientModel');
const mongoose = require('mongoose');

// Ensure that only logged-in users can perform actions
const checkUserAuth = (req) => req.user && req.user._id;

const getPatients = async (req, res) => {
  const user_id = req.user._id;
  try {
    const patients = await Patient.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(patients);
  } catch (err) {
    res.status(500).json({ error: 'Unable to fetch patients' });
  }
};

const getPatient = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such Patient' });
  }

  try {
    const patient = await Patient.findById(id);
    if (!patient) {
      return res.status(404).json({ error: 'No such Patient' });
    }
    res.status(200).json(patient);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching patient details' });
  }
};

const createPatient = async (req, res) => {
  const { name, age, gender, place, disease, bloodgroup, specialist, weight, height, emergencyservice } = req.body;

  let emptyFields = [];
  if (!name) emptyFields.push('name');
  if (!age) emptyFields.push('age');
  if (!gender) emptyFields.push('gender');
  if (!place) emptyFields.push('place');
  if (!disease) emptyFields.push('disease');
  if (!bloodgroup) emptyFields.push('bloodgroup');
  if (!specialist) emptyFields.push('specialist');
  if (!weight) emptyFields.push('weight');
  if (!height) emptyFields.push('height');
  if (!emergencyservice) emptyFields.push('emergencyservice');

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields });
  }

  try {
    const user_id = req.user._id;
    // Check if a patient with the same name already exists for the user
    const existingPatient = await Patient.findOne({ name, user_id });
    if (existingPatient) {
      return res.status(400).json({ error: 'A patient with this name already exists' });
    }

    const patient = await Patient.create({
      name,
      age,
      gender,
      place,
      disease,
      bloodgroup,
      specialist,
      height,
      weight,
      emergencyservice,
      user_id,
    });

    res.status(200).json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deletePatient = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such Patient' });
  }

  try {
    const patient = await Patient.findOneAndDelete({ _id: id });
    if (!patient) {
      return res.status(400).json({ error: 'No such Patient' });
    }
    res.status(200).json(patient);
  } catch (err) {
    res.status(500).json({ error: 'Unable to delete patient' });
  }
};

const updatePatient = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such Patient' });
  }

  try {
    const patient = await Patient.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });
    if (!patient) {
      return res.status(400).json({ error: 'No such Patient' });
    }
    res.status(200).json(patient);
  } catch (err) {
    res.status(500).json({ error: 'Unable to update patient' });
  }
};

const searchPatient = async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ error: 'Please provide a search query' });
  }

  // Sanitize the name input (to escape special characters)
  const sanitizedName = name.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

  try {
    const patients = await Patient.find({
      name: { $regex: sanitizedName, $options: 'i' }, // Case-insensitive search for name
    });

    if (patients.length === 0) {
      return res.status(404).json({ message: `No patients found with the name "${name}"` });
    }

    res.status(200).json(patients);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(400).json({ error: 'Could not fetch patients' });
  }
};

module.exports = {
  getPatients,
  getPatient,
  createPatient,
  deletePatient,
  updatePatient,
  searchPatient,
};
