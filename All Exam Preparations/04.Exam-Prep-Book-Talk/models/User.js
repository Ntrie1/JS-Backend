const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minLength: [10, 'Email is too short!']
    },

    username: {
        type: String,
        required: true,
        minLength: [4, 'Username is too short!'],
    },

    password: {
        type: String,
        required: true,
        minLength: [3, 'Password is too short!'],
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