import jwt from 'jsonwebtoken';

export function optionalAuth(req, _res, next) {
  const h = req.headers.authorization;
  if (!h?.startsWith('Bearer ')) return next();
  const token = h.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
  } catch {
  }
  next();
}
