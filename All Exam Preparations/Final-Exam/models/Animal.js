const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required!'],
    minLength: [2, 'Name must be at least 2 characters!']
  },
  years: {
    type: Number,
    required: [true, 'Years are required!'],
    min: [1, 'The number of age should be at least 1'],
    max: [100, 'The max number of age is a 100']
  },
  kind: {
    type: String,
    required: [true, 'Kind is required!'],
    minLength: [3, 'Kind of must be at least 3 characters!']
  },
  image: {
    type: String,
    required: [true, 'ImageUrl is required!'],
    validate: {
      validator: (value) => {
        return /^https?:\/\//.test(value);
      },
      message: 'Invalid image URL format'
    }
  },
  need: {
    type: String,
    required: [true, 'Needs of animal are required!'],
    minlength: [3, 'At least 3 characters required at needs of field!'],
    maxlength: [20, 'No more than 3 characters allowed at needs of field!'],
  },
  location: {
    type: String,
    required: [true, 'Location is required!'],
    minlength: [5, 'Location must be at least 5 characters!'],
    maxlength: [15, 'Location should be less than 15 characters!'],
  },
  description: {
    type: String,
    required: [true, 'Description is required!'],
    minlength: [5, 'Description must be at least 5 characters!'],
    maxlength: [50, 'Description should be less than 50 characters!'],
  },

  donations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;
