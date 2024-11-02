import { Router } from 'express'
import {
  registerUser,
  login,
  verifyToken,
  logout
} from '../controllers/user_controller.js'
import { registerSchema, loginSchema } from '../schemas/userSchema.js'
import { validateSchema } from '../middlewares/validator_middleware.js'
export const authRouter = Router()

authRouter.post('/register', validateSchema(registerSchema), registerUser) // register req
authRouter.post('/login', validateSchema(loginSchema), login) // login req
authRouter.get('/verify', verifyToken) // verify token req
authRouter.post('/logout', logout) // logout req