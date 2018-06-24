const { users } = require('../models')
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
  if (!password) {
    throw new Error('password required')
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  return users.insertUser(email, hashedPassword)
}

/**
 * signIn
 * verify user email and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<boolean>}
 */
async function signIn (email, password) {
  if (!email) {
    throw new Error('Email required')
  }
  if (!password) {
    throw new Error('Password required')
  }

  const userData = await users.getUserDataByEmail(email)

  if (!userData) {
    throw new Error('Invalid email or password')
  }

  return bcrypt.compare(password, userData.password)
}

module.exports = {
  signUp,
  signIn
}
