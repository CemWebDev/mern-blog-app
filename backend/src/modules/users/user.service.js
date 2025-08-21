import User from '../auth/auth.model.js';
import Like from '../likes/like.model.js';
import Post from '../posts/post.model.js';

const sanitize = (user) => ({
  id: user._id.toString(),
  email: user.email,
  username: user.username,
  avatarUrl: user.avatarUrl,
  githubId: user.githubId,
  createdAt: user.createdAt,
});

const httpError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

export const getMe = async (_body, _params, _query, req) => {
  const userId = req.user?.id;
  if (!userId) throw httpError('Unauthorized', 401);

  const me = await User.findById(userId).select('-password');
  if (!me) throw httpError('User not found', 404);

  const postCount = await Post.countDocuments({ author: userId });
  const likeCount = await Like.countDocuments({ userId: userId });

  return {
    user: {
      ...sanitize(me),
      postCount,
      likeCount,
    },
  };
};

export const updateMe = async (body, _params, _query, req) => {
  const me = await User.findById(req.user.id);
  if (!me) throw httpError('User not found', 404);

  const { username, email } = body;

  if (me.githubId)
    throw httpError('Cannot update user with GitHub account', 403);

  if (
    typeof username === 'string' &&
    username.trim() &&
    username.trim() !== me.username
  ) {
    const usernameExists = await User.findOne({
      username: username.trim(),
      _id: { $ne: me._id },
    });
    if (usernameExists) throw httpError('Username already in use', 409);
    me.username = username.trim();
  }

  if (
    typeof email === 'string' &&
    email.trim() &&
    email.trim().toLowerCase() !== me.email
  ) {
    const emailExists = await User.findOne({
      email: email.trim().toLowerCase(),
      _id: { $ne: me._id },
    });
    if (emailExists) throw httpError('Email already in use', 409);
    me.email = email.trim().toLowerCase();
  }

  await me.save();
  return { user: sanitize(me) };
};
