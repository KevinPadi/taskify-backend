// api/routes/apiRouter.js
import { Router } from 'express';
import {
  createBoard,
  getBoards,
  updateBoard,
  deleteBoard,
} from '../controllers/board_controller.js';
import {
  createList,
  getLists,
  updateList,
  deleteList,
} from '../controllers/list_controller.js';
import {
  getCards,
  updateCard,
  createCard,
  deleteCard,
} from '../controllers/card_controller.js';
import {
  registerUser,
  login,
  verifyToken,
  logout,
} from '../controllers/user_controller.js';
import { auth } from '../middlewares/auth_middleware.js';
import { validateSchema } from '../middlewares/validator_middleware.js';
import { boardSchema } from '../schemas/boardSchema.js';
import listSchema from '../schemas/listSchema.js';
import cardSchema from '../schemas/cardSchema.js';
import { registerSchema, loginSchema } from '../schemas/userSchema.js';

const apiRouter = Router();

// Rutas de autenticación
apiRouter.post('/register', validateSchema(registerSchema), registerUser);
apiRouter.post('/login', validateSchema(loginSchema), login);
apiRouter.get('/verify', verifyToken);
apiRouter.post('/logout', logout);

// Rutas de tableros
// apiRouter.get('/board', auth, getBoards);
// apiRouter.post('/board', auth, validateSchema(boardSchema), createBoard);
// apiRouter.patch('/board/:id', auth, updateBoard);
// apiRouter.delete('/board/:id', auth, deleteBoard);

export default apiRouter;
