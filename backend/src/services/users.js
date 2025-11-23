import bcrypt from 'bcrypt'
import { User } from '../db/models/user.js'
import jwt from 'jsonwebtoken'

// Create user service function ===============================================
export async function createUser({ username, password }) {
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = new User({ username, password: hashedPassword })
  return await user.save()
} // end create user

// Login user service function ================================================
export async function loginUser({ username, password }) {
  const user = await User.findOne({ username })
  if (!user) {
    throw new Error('Invalid username!')
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password)
  if (!isPasswordCorrect) {
    throw new Error('Invalid password!')
  }
  // Note: If the username and password are correct create a token ============
  const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, {
    expiresIn: '12h',
  })
  return token
} // end login user
