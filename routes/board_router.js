import { Router } from 'express'
import {
  createBoard,
  getBoards,
  updateBoard,
  deleteBoard,
} from '../controllers/board_controller.js'
import { auth } from '../middlewares/auth_middleware.js'
import { validateSchema } from '../middlewares/validator_middleware.js'
import { createBoardSchema } from '../schemas/boards_schema.js'

export const boardsRouter = Router()

boardsRouter.get('/boards', auth, getBoards)
boardsRouter.post('/boards', auth, validateSchema(createBoardSchema), createBoard)
boardsRouter.patch('/boards/:id', auth, updateBoard)
boardsRouter.delete('/boards/:id', auth, deleteBoard)