import mongoose from 'mongoose';

const usernameRegex = /^[a-zA-Z0-9_.-]+$/;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
    match: usernameRegex,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => /^\S+@\S+\.\S+$/.test(v),
      message: 'Invalid email format',
    },
    lowercase: true,
    trim: true,
  },
  githubId: {
    type: String,
    unique: true,
    sparse: true,
  },
  password: {
    type: String,
    required: function () {
      return !this.githubId;
    },
    minlength: 6,
  },
  avatarUrl: { type: String, default: '' },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);
export default User;
