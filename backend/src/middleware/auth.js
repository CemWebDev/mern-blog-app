import { getUserFromToken } from '../utils/authHelpers.js';

export const protect = (req, res, next) => {
  const user = getUserFromToken(req.headers.authorization);

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  req.user = user;
  next();
};
