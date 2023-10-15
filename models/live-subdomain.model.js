const mongoose = require('mongoose')

const livesubdomainSchema = new mongoose.Schema({
    target: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Target'
    },
    subdomain: {
        type: String,
        unique: true
    }
})

const livesubdomain = mongoose.model('livesubdomain', livesubdomainSchema)

module.exports = livesubdomain