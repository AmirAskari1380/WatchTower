const liveSubdomains = require('../models/live-subdomain.model')
const httpSubdomains = require("../models/http-services.model")

async function getAllLiveSubdomains() {
    return (await liveSubdomains.find({}).select('subdomain').distinct('subdomain')).join('\n')
}

async function getAllHTTPSubdomains() {
    return (await httpSubdomains.find({}).select('subdomain').distinct('subdomain')).join('\n')
}

module.exports = {
    getAllLiveSubdomains,
    getAllHTTPSubdomains
}