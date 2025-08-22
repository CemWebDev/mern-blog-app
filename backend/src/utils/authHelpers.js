import { verifyToken } from './jwt.js';

export const getUserFromToken = (authHeader) => {
  if (!authHeader?.startsWith('Bearer ')) return null;

  const token = authHeader.split(' ')[1];
  try {
    const decoded = verifyToken(token);
    return { id: decoded.id };
  } catch {
    return null;
  }
};
