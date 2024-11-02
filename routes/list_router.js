import { Router } from "express"
import {
  createList,
  getLists,
  updateList,
  deleteList
} from "../controllers/list_controller.js"
import { auth } from "../middlewares/auth_middleware.js"
import { validateSchema } from "../middlewares/validator_middleware.js"
import listSchema from "../Schemas/listSchema.js"

export const listRouter = Router()

listRouter.get('/list/:boardId', auth, getLists)
listRouter.post('/list/:boardId', auth, validateSchema(listSchema), createList)
listRouter.patch('/list/:boardId/:id', auth, updateList)
listRouter.delete('/list/:boardId/:id', auth, deleteList)