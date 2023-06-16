const mongoose = require('mongoose');


const gameSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minLength: [4, 'Name is too short!']
        
    },

    image: {
        type: String, 
        required: true,
        match: [/^http:\/\/|https:\/\//, 'Invalid URL!'],
    },

    price:{
        type: Number,
        required: true,
        minLength: [0, 'The price must be a positive number!']
    },

    description:{
        type: String,
        required: true,
        minLength: [10, 'Too short description!']
    },

    genre: {
        type: String,
        required: true,
        minLength: [2, 'Too short genre input!']
    }, 

    platform:{
        type: String, 
        required: true,
        enum: ['PC', 'Nintendo', 'PS4', 'PS5', 'XBOX'],
    },

    boughtBy: [{  
     type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }],

      owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
})

const Game = mongoose.model('Game', gameSchema);

module.exports = Game