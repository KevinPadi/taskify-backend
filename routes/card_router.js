import { Router } from "express";
import {
  getCards,
  updateCard,
  createCard,
  deleteCard
} from "../controllers/card_controller.js";
import { auth } from "../middlewares/auth_middleware.js";
import { validateSchema } from "../middlewares/validator_middleware.js";
import cardSchema from '../Schemas/cardSchema.js'

export const cardRouter = Router()

cardRouter.get('/card/:listId/:boardId', auth, getCards)
cardRouter.post('/card/:listId/:boardId', auth, validateSchema(cardSchema), createCard)
cardRouter.patch('/card/:listId/:boardId/:id', auth, updateCard)
cardRouter.delete('/card/:listId/:boardId/:id', auth, deleteCard)