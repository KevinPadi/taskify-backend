import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const auth = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const user = jwt.verify(token, TOKEN_SECRET);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
