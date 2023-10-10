const express = require('express')
const cronRoutes = require('./routes/cron.route')
const mongoose = require('mongoose')
const app = express()
const port = 3000

mongoose.connect('Mongodc-uri', {
  useNewUrlParser: true, 
  useUnifiedTopology: true
})

app.use('/cron', cronRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
 