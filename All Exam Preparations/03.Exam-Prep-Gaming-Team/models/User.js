const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
        minLength: [5, 'Username is too short!']
    },

    email: {
        type: String,
        required: [true, 'Email is required!'],
        minLength: [10, 'Email is too short!']
    },

    password: {
        type: String,
        required: [true, 'Password is required!'],
        minLength: [4, 'Password is too short!']
    }
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