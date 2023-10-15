const SubdomainEnumeration = require('./subdomain-enumeration.cron')
const ResolveSubdomains = require('./live-subdomains.cron')
const HTTPService = require('./http-service.cron')

const jobs = [
    {
        id: 1,
        name: 'Subdomain enumeration',
        cronTime: '0 * * * *',
        active: false,
        fn: SubdomainEnumeration
    },
    {
        id: 2,
        name: 'Resolve subdomains',
        cronTime: '0 */4 * * *',
        active: false,
        fn: ResolveSubdomains
    },
    {
        id: 3,
        name: 'HTTP Services',
        cronTime: '0 0 * * *',
        active: false,
        fn: HTTPService
    }
]

module.exports = jobs
