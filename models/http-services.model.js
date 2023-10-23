const mongoose = require('mongoose')

const httpserviceSchema = new mongoose.Schema({
    target: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Target'
    },
    subdomain: {
        type: String,
        unique: true
    },
    createdAt : {
        type: Date,
        default: Date.now
    }
})

const httpservice = mongoose.model('httpservice', httpserviceSchema)

module.exports = httpservice