const mongoose = require('mongoose');


const cryptoSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 2,
        required: true,
    },

    image: {  
        type: String,
        required: true,
        validate: /^https?:\/\//,
    },

    price: {
        type: Number,
        minLength: 0,
        required: true
    },

    description: {
        type: String,
        required: true
     },

     paymentMethod: {
        type: String,
        enum: {
           values: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal'],
           message: 'Invalid payment method',
        },
        required: true,
     },

     owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
     },

     buyers: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
     }]

})


const Crypto =  mongoose.model('Crypto', cryptoSchema);

module.exports = Crypto;