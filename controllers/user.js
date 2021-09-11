const User = require('../models/user')
const { errorHandler } = require('../helpers/dbErrorHandler')
const expressJwt = require('express-jwt') // for authorization check
const jwt = require('jsonwebtoken')
require('dotenv').config()

// User Signup
exports.signup = async (req, res) => {
  try {
    console.log(req.body)
    const { name, email, password } = req.body
    // validation
    if (!name) return res.status(400).send({ error: 'Name is required!' })
    if (!password || password.length < 6)
      return res.status(400).send({
        error: 'Password is required and should be min 6 characters long',
      })
    let userExist = await User.findOne({ email }).exec()
    if (userExist) return res.status(400).send({ error: 'Email is taken' })
    // register
    const user = new User(req.body)

    await user.save()
    console.log('USER CREATED', user)
    return res.json({ ok: true })
  } catch (err) {
    console.log('CREATE USER FAILED', err)
    return res.status(400).send('Error. Try again.')
  }
}

// User Login
exports.signin = (req, res) => {
  const { email, password } = req.body
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      console.log(err)
      return res.status(400).json({
        error: "Email doesn't exist, please signup.",
      })
    }
    //If user found make sure Email & Password match
    //Create authenticate method in user model
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Email & password doesn't match",
      })
    }
    //Generate a signed token with user id and secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
    //Persist the token as 't' in Cookie with expiry date
    res.cookie('t', token, { expiry: new Date() + 9999 })
    //Return response with user and token to front-end client
    const { _id, name, email, role } = user
    return res.json({ token, user: { _id, email, name, role } })
  })
}

exports.signout = (req, res) => {
  res.clearCookie('t')
  res.json({ message: 'Signout Successful!' })
}

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'], // added later
  userProperty: 'auth',
})

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id
  if (!user) {
    return res.status(403).json({
      error: 'Access denied',
    })
  }
  next()
}

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: 'Admin resource! Access denied',
    })
  }
  next()
}
