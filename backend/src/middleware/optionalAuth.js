import { getUserFromToken } from '../utils/authHelpers.js';

export const optionalAuth = (req, _res, next) => {
  const user = getUserFromToken(req.headers.authorization);
  if (user) {
    req.user = user;
  }
  next();
};
