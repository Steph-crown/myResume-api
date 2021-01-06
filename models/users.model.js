const mongoose = require('mongoose');

const schema = 
    {
        name: {
            type: String,
            minLength:3,
            required: [true, 'No `name` key in request'],
            trim: true
        },
        email: {
            type: String,
            required: [true, 'No `email` key in  request'],
            trim: true,
        },
        password: {
            type: String,
            minLength: 4,
            trim: true,
            required: [true, 'No `password` key in request']
        }
    };

    const userSchema = mongoose.Schema(schema);

    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     
    // Validates the email.
    userSchema.path('email').validate(function (email) {
        return emailRegex.test(email); // Assuming email has a text attribute
     }, 'The e-mail is not a valid e-mail.')
    
    
    module.exports = mongoose.model('users', userSchema)