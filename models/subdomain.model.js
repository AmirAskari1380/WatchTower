const mongoose = require('mongoose')

const subdomainSchema = new mongoose.Schema({
    target: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Target'
    },
    subdomain: {
        type: String,
        unique: true
    }
})

const subdomain = mongoose.model('subdomain', subdomainSchema)

module.exports = subdomain