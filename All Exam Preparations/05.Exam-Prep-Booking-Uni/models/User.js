const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (email) {
              // Regular expression pattern for email validation
              const regex = /^[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z]+$/;
              return regex.test(email);
            },
            message: 'Invalid email format'
          }
    },

    password: {
        type: String,
        required: true,
        minLength: 5,
        validate: {
            validator: function (email) {
              // Regular expression pattern for email validation
              const regex = /^[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z]+$/;
              return regex.test(email);
            },
            message: 'Invalid email format'
          }
    },

    bookedHotels: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Hotel'
        }
      ],

      offeredHotels: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Hotel'
        }
      ]
      
}, {
    virtuals: {
        repeatPassword: {
            set(value){
                if(this.password !== value){
                    throw new mongoose.Error('Password missmatch!')
                }
            }
        }
    }
});


const User = mongoose.model('User', userSchema);

module.exports = User;