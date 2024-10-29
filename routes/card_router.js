import { Router } from "express";
import {
  getCards,
  updateCard,
  createCard,
  deleteCard
} from "../controllers/card_controller";
import { auth } from "../middlewares/auth_middleware";
import { validateSchema } from "../middlewares/validator_middleware";
import cardSchema from '../Schemas/cardSchema.js'

export const cardRouter = Router()

cardRouter.get('/card', auth, getCards)
cardRouter.post('/card', auth, validateSchema(cardSchema), createCard)
cardRouter.patch('/card/:id', auth, updateCard)
cardRouter.delete('/card/:id', auth, deleteCard)