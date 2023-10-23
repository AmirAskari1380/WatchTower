const express = require('express')
const mongoose = require('mongoose')
const CronRoutes = require('./routes/cron.route')
const TargetRoutes = require('./routes/target.route')
const LiveSubdomainRoutes = require('./routes/subdomains.route')
const app = express()

const port = 3000

mongoose.connect('mongodb://127.0.0.1:27017/WatchTower', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(express.json());
app.use('/cron', CronRoutes);
app.use('/target', TargetRoutes);
app.use('/subdomains', LiveSubdomainRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})