const jobs = require('../cron/jobs')
const cron = require('node-cron')

function getAllCrons() {
    return jobs.map((job) => ({
        id: job.id,
        name: job.name,
        cronTime: job.cronTime,
        active: job.active
    }))
}

function activeJob(id) {
    const job = jobs.find((job) => job.id = id)

    if (!job) {
        return {error: 'Job not found'}
    }

    if (job.active) {
        return {error: 'Job is already activated'}
    }

    job.active = true
    job.cron = cron.schedule(job.cronTime, job.fn)
    
    return {"Message": "Job has activated successfully!"}
}

function deactiveJob(id) {
    const job = jobs.find((job) => job.id = id)

    if (!job) {
        return {error: 'Job not found'}
    }

    if (!job.active) {
        return {error: 'Job is already activated'}
    }

    job.active = false
    job.cron.stop()

    return {"Message": "Job has deactivated successfully!"}
}

module.exports = {
    getAllCrons, 
    activeJob, 
    deactiveJob
}