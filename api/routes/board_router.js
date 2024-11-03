import { Router } from 'express'
import {
  createBoard,
  getBoards,
  updateBoard,
  deleteBoard,
} from '../api/controllers/board_controller.js'
import { auth } from '../api/middlewares/auth_middleware.js'
import { validateSchema } from '../api/middlewares/validator_middleware.js'
import { boardSchema } from '../schemas/boardSchema.js'

export const boardsRouter = Router()

boardsRouter.get('/board', auth, getBoards)
boardsRouter.post('/board', auth, validateSchema(boardSchema), createBoard)
boardsRouter.patch('/board/:id', auth, updateBoard)
boardsRouter.delete('/board/:id', auth, deleteBoard)