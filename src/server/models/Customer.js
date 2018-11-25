const mongoose = require('mongoose')
const Schema = mongoose.Schema

const customerSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    profilePicture: {
        type: String,
        default:
            'https://upload.wikimedia.org/wikipedia/commons/9/93/Default_profile_picture_%28male%29_on_Facebook.jpg',
    },
})

module.exports = mongoose.model('customer', customerSchema)
