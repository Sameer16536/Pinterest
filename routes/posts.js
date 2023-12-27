const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  imageText: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  like:{type:Array , default:[]},
  imageURL:{type:String},
  createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
