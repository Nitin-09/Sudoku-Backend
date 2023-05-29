const connectToMongo =require('./db')
const express = require('express')
const serverless = require('serverless-http')
const cors=require('cors')
connectToMongo();

const app = express()
const port = 5000

//middleware
app.use(cors())
app.use(express.json())

//routes
app.use('/.netlify/functions/api/auth',require('../routes/auth'))
app.use('/.netlify/functions/api/game',require('../routes/game'))
app.use('/.netlify/functions/api/dashboard',require('../routes/dashboard'))

app.listen(port, () => {
  console.log(`Backend of Sudoku listening on port ${port}`)
})
module.exports = app
module.exports.handler = serverless(app)