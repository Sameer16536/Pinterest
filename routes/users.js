var express = require('express');
var router = express.Router();

const mongoose = require('mongoose')
const plm = require('passport-local-mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/Pinterest')


const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  fullname: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  posts:[{type:mongoose.Schema.Types.ObjectId, ref : 'Post'}],
  dp:{ type:String}
});

userSchema.plugin(plm)
const User = mongoose.model('User', userSchema);





module.exports = User;
