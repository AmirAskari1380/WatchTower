const express = require('express')
const router = express.Router()
const SubdomainController = require('../controller/subdomain.controller')


router.get('/', async (req, res) => {
    const { fresh } = req.query
    res.send(await SubdomainController.getAllSubdomains(fresh))
})

router.get('/live', async (req, res) => {
    const { fresh } = req.query
    res.send(await SubdomainController.getAllLiveSubdomains(fresh))
})

router.get('/http', async (req, res) => {
    res.send(await SubdomainController.getAllHTTPSubdomains())
})

module.exports = router 