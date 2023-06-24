const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        match: /^[a-zA-Z]+$/,
    },

    lastName: {
        type: String,
        required: true,
        minlength: 5,
        match: /^[a-zA-Z]+$/,
    },

    email: {
        type: String,
        required: true,
        match: /^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$/,
    },

    password: {
        type: String,
        required: true,
        minLength: 4
    },

    myPosts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]
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