const express = require('express')
const cronController = require('../controller/cron.controller')
const router = express.Router()

router.get('/all', (req, res) => {
    res.send(cronController.getAllCrons())
})

router.post('/active/:id', (req, res) => {
    res.send(cronController.activeJob(parseInt(req.params.id)))
})

router.delete('/deactive/:id', (req, res) => {
    res.send(cronController.deactiveJob(parseInt(req.params.id)))
})

module.exports = router
