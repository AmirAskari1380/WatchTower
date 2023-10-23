const express = require('express')
const router = express.Router()
const liveSubdomainController = require('../controller/subdomain.controller')

router.get('/live', async (req, res) => {
    res.send(await liveSubdomainController.getAllLiveSubdomains())
})

router.get('/http', async (req, res) => {
    res.send(await liveSubdomainController.getAllHTTPSubdomains())
})

module.exports = router