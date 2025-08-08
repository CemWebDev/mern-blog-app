import User from './auth.model.js';
import { hashPassword, comparePassword } from '../../utils/password.js';
import { signToken } from '../../utils/jwt.js';

const register = async ({ username, email, password }) => {
  const userExists = await User.findOne({ email });
  if (userExists) {
    const error = new Error('User already exists');
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await hashPassword(password);
  const user = new User({
    username,
    email,
    password: hashedPassword,
  });
  await user.save();
  const token = signToken({
    id: user._id,
    email: user.email,
    avatarUrl: user.avatarUrl,
    username: user.username,
    githubId: user.githubId,
  });

  return { user, token };
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    const error = new Error('Invalid credentials');
    error.statusCode = 401;
    throw error;
  }

  const token = signToken({
    id: user._id,
    email: user.email,
    avatarUrl: user.avatarUrl,
    username: user.username,
    githubId: user.githubId,
  });
  return { user, token };
};

export { register, login };
