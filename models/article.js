const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 80,
    },
    description: {
      type: String,
      required: true,
      maxlength: 3500,
    },
    // category: {
    //   type: ObjectId,
    //   ref: 'Category',
    //   required: true,
    // },
    // author: {
    //   type: ObjectId,
    //   ref: 'User',
    //   required: true,
    // },
    category: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Article', articleSchema)
