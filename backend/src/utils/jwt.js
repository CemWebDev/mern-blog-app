import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

/**
 * @param {Object} payload
 * @returns {string}
 */

const signToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

/**
 * @param {string} token
 * @returns {Object}
 */

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

export { signToken, verifyToken };
