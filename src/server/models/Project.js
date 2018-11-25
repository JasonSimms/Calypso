const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    owner: {
         type: Schema.Types.ObjectId, ref: 'User'
    },
    customer: {
        type: {type: Schema.Types.ObjectId, ref: 'Customer'}
    },
    description: { type: String },
    updated: { type: Date, default: Date.now },
    image: {
        type: String,
        default:
            'https://a.wattpad.com/useravatar/Kawaii_Doge09.128.860381.jpg',
    },
})

module.exports = mongoose.model('Project', projectSchema)
