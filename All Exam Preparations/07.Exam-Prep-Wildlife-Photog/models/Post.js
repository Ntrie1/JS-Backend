const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 6
    },
    keyword: {
        type: String,
        required: true,
        minLength: 6
    },
    location: {
        type: String,
        required: true,
        minLength: 15
    },
    date: {
        type: String,
        required: true,
        validate: {
          validator: function (date) {
            return date.length === 10 && /\d{2}\.\d{2}\.\d{4}/.test(date);
          },
          message: 'Invalid date format. Expected format: "02.02.2021"',
        },
    },
    image: {
        type: String,
        required: true,
    },
    description : {
        type: String,
        required: true,
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },

      votesOnPost: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        }
      ]
      ,
      ratingOfPost: {
        type: Number,
        default: 0
      }

})


const Post = mongoose.model('Post', postSchema);

module.exports = Post;