const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = new Schema({
  title: String,
  body: String,
  tags: [String],
  publishedDate: {
    type: Date,
    default: Date.now,
  },
  user: {
    _id: mongoose.Types.ObjectId,
    username: String,
  },
});

// 파라미터 - (스키마명, 스키마객체)
// 데이터베이스는 스키마명의 복수형태로 만들어짐 -> posts
// BookInfo -> bookinfos
const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
