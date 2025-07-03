import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config.js';

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  app.use('/api/trips', authenticate, tripRoutes);

  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Forbidden' });
  }
};
