const connectToMongo =require('./db')
const express = require('express')
const cors=require('cors')
connectToMongo();

const app = express()
const port = 5000

//middleware
app.use(cors())
app.use(express.json())

//routes
app.use('/api/auth',require('../routes/auth'))
app.use('/api/game',require('../routes/game'))
app.use('/api/dashboard',require('../routes/dashboard'))

app.listen(port, () => {
  console.log(`Backend of Sudoku listening on port ${port}`)
})