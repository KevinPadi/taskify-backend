import User from '../models/user_model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { createAccessToken } from '../utils.js'
import { config as configDotenv } from "dotenv";

configDotenv()
const TOKEN_SECRET = process.env.TOKEN_SECRET

export const registerUser = async (req, res) => {


  const { userName, email, password } = req.body

  try {
    // hashing the passwrod
    const passwordHash = await bcrypt.hash(password, 10)

    const newUser = new User({
      userName,
      email,
      password: passwordHash
    })

    // saving the user in the db
    const userSaved = await newUser.save()

    // creating access token
    const token = await createAccessToken({ id: userSaved._id })

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
    });
    res.json({ message: 'Usuario registrado exitosamente', user: newUser, token })
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el usuario', error: error.message })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    // searching the user by email
    const userFound = await User.findOne({ email })

    if (!userFound) {
      return res.status(400).json({
        message: 'The email does not exist'
      })
    }

    // comparing passwords
    const isMatch = await bcrypt.compare(password, userFound.password)
    if (!isMatch) {
      return res.status(400).json({
        message: 'The password is incorrect'
      })
    }

    const token = await createAccessToken({ id: userFound._id })

    // TODO: RECORDA CAMBIAR ESTO POR EL CODIGO DE FAST ANTES DE DESPLEGAR A PRODUCCIÓN
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Cambia esto a true solo en producción
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    })

    res.json({
      id: userFound._id,
      userName: userFound.userName,
      email: userFound.email
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const verifyToken = async (req, res) => {
  const { token } = req.cookies
  if (!token) return res.send(req.cookies)

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.sendStatus(401)

    const userFound = await User.findById(user.id)
    if (!userFound) return res.sendStatus(401)

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email
    })
  })
}

export const logout = async (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // TODO: Cambia esto a true solo en producción
    expires: new Date(0)
  })
  return res.json({ message: 'Sesión cerrada exitosamente' })
}