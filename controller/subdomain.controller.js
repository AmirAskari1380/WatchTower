const liveSubdomains = require('../models/live-subdomain.model')
const httpSubdomains = require("../models/http-services.model")
const subdomains = require('../models/subdomain.model')

async function getAllSubdomains(fresh) {
    if (!fresh) {
        return (await subdomains.find({}).select('subdomain').distinct('subdomain')).join('\n')
    } else {
        let twentyFourHoursAgo = new Date()
        twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24)
        let isoTwentyFourHoursAgo = twentyFourHoursAgo.toISOString()
        return (await subdomains.find({
            createdAt: {
                $gte: isoTwentyFourHoursAgo,
                $lt: new Date().toISOString()
            }
        }).select('subdomain').distinct('subdomain')).join('\n')
    }
}

async function getAllLiveSubdomains(fresh) {
    if (!fresh) {
        return (await liveSubdomains.find({}).select('subdomain').distinct('subdomain')).join('\n')
    } else {
        let twentyFourHoursAgo = new Date()
        twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24)
        let isoTwentyFourHoursAgo = twentyFourHoursAgo.toISOString()
        return (await liveSubdomains.find({
            createdAt: {
                $gte: isoTwentyFourHoursAgo,
                $lt: new Date().toISOString()
            }
        }).select('subdomain').distinct('subdomain')).join('\n')
    }
}

async function getAllHTTPSubdomains() {
    return (await httpSubdomains.find({}).select('subdomain').distinct('subdomain')).join('\n')
}

module.exports = {
    getAllLiveSubdomains, 
    getAllHTTPSubdomains,
    getAllSubdomains
}