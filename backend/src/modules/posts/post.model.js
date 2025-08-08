import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 3, maxlength: 120 },
  content: { type: String, required: true, minlength: 10 },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model('Post', postSchema);
export default Post;
