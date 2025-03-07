const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id, isAdmin) => {
  return jwt.sign({ _id, isAdmin }, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.login(email, password)

    // create a token with the user's isAdmin status
    const token = createToken(user._id, user.isAdmin)

    res.status(200).json({ email, token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// signup a user
const signupUser = async (req, res) => {
  const { email, password, isAdmin } = req.body // Admin status can be passed during signup

  try {
    const user = await User.signup(email, password, isAdmin)

    // create a token with the user's isAdmin status
    const token = createToken(user._id, user.isAdmin)

    res.status(200).json({ email, token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = { signupUser, loginUser }
