const express = require('express')
const cronController = require('../controller/cron.controller')
const router = express.Router()
const httpx = require('../cron/http-service.cron')
const resolve = require('../cron/live-subdomains.cron')
const SubdomainEnumeration = require('../cron/subdomain-enumeration.cron')

router.get('/all', (req, res) => {
    res.send(cronController.getAllCrons())
})

router.post('/active/:id', (req, res) => {
    res.send(cronController.activeJob(parseInt(req.params.id)))
})

router.delete('/deactive/:id', (req, res) => {
    res.send(cronController.deactiveJob(parseInt(req.params.id)))
})

router.get('/test', (req, res) => {
    httpx()
    // resolve()
    // SubdomainEnumeration()
    res.send({"meesage": "Function going to run ..."})
})

module.exports = router
