const mongoose = require('mongoose')

const targetSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    scope: [String],
    out_of_scopes: [String],
    eligible_for_bounty: Boolean,
    source: {
        type: String,
        enum: ['hackerone', 'bugcrowd']
    },
    type: {
        type: String,
        enum: ['public', 'private']
    }
})

const target = mongoose.model('target', targetSchema)

module.exports = target