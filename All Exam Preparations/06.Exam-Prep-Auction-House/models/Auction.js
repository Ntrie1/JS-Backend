const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 4,
  },
  description: {
    type: String,
    maxlength: 200,
  },
  category: {
    type: String,
    required: true,
    enum: ['vehicles', 'estate', 'electronics', 'furniture', 'other'],
  },
  image: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  bidder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Auction = mongoose.model('Auction', auctionSchema);

module.exports = Auction;