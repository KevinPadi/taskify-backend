import { Router } from "express"
import {
  createList,
  getLists,
  updateList,
  deleteList
} from "../controllers/list_controller"
import { auth } from "../middlewares/auth_middleware"
import { validateSchema } from "../middlewares/validator_middleware"
import listSchema from "../Schemas/listSchema"

export const listRouter = Router()

listRouter.get('/list', auth, getLists)
listRouter.post('/list', auth, validateSchema(listSchema), createList)
listRouter.patch('/list/:id', auth, updateList)
listRouter.delete('/list/:id', auth, deleteList)