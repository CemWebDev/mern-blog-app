import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

/**
 * Generate a JSON Web Token for a user.
 *
 * @param {Object} user 
 * @param {string} user._id
 * @param {string} user.email
 * @param {string} user.username
 * @returns {string}
 */
const signToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    username: user.username,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

/**
 * @param {string} token
 * @returns {Object}
 */

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

export { signToken, verifyToken };
