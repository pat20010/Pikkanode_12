const { users } = require('../models')
const regEx = require('../config/regEx')
const bcrypt = require('bcrypt')

/**
 * signUp
 * sign up new user then return user id
 * @param {string} email
 * @param {string} password
 * @returns {Promise<number>}
 */
async function signUp (email, password) {
  if (!email) {
    throw new Error('email required')
  }

  if (!regEx.EMAIL.test(email)) {
    throw new Error('Invalid email')
  }

  if (!password) {
    throw new Error('password required')
  }

  if (password.length < 6) {
    throw new Error('Password too short')
  }

  const hashedPassword = await bcrypt.hash(password, 12)
  return users.insertUser(email, hashedPassword)
}

/**
 * signIn
 * verify user email and password then return user id
 * @param {string} email
 * @param {string} password
 * @returns {Promise<number>}
 */
async function signIn (email, password) {
  if (!email) {
    throw new Error('Email required')
  }
  if (!password) {
    throw new Error('Password required')
  }

  const userData = await users.getUserDataByEmail(email)
  console.log(userData[0])

  if (!userData[0]) {
    throw new Error('Invalid email or password')
  }

  const success = await bcrypt.compare(password, userData[0].password)
  console.log(`Sign in status : ${success}`)

  if (!success) {
    throw new Error('Invalid email or password')
  }

  return userData[0].id
}

module.exports = {
  signUp,
  signIn
}
