const express = require('express')
const router = express.Router()
const targetController = require('../controller/target.controller')

router.get('/', async (req, res) => {
    res.send(await targetController.getAllTargets())
})

router.post('/', async (req, res) => {
    const { name, scope, out_of_scopes, eligible_for_bounty, source, type } = req.body
    res.send(await targetController.createTarget(name, scope, out_of_scopes, eligible_for_bounty, source, type))
})

module.exports = router