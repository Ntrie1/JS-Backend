const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minLength: 4,
  },
  city: {
    type: String,
    required: true,
    minLength: 3,
  },
  imageUrl: {
    type: String,
    required: true,
    match: [/^http:\/\/|https:\/\//, 'Invalid URL!'],
  },
  freeRooms: {
    type: Number,
    required: true,
    min: 1,
    max: 100
  },
  usersBooked: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
  ,
  owner: {
    type: String,
    required: true
  }

});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;