const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: [2, 'Title must be at least 2 characters!']
    },
    author: {
        type: String,
        required: true,
        minLength: [5, 'Author must be at least 5 characters!']
        
    }, 
    image: {
        type: String,
        required: true,
        match: [/^http:\/\/|https:\/\//, 'Invalid URL!'],
    },
    review:{
        type: String,
        required: true,
        minLength: [10, 'Review must be at least 10 characters!']
    },
    genre: {
        type: String,
        required: true,
        minLength: [3, 'Genre must be at least 3 characters!']
    },
    stars:{
        type: Number,
        required:true,
        min: 1,
        max: 5,
    },

    wishingList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }],

      owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
});


const Book = mongoose.model('Book', bookSchema);

module.exports = Book;