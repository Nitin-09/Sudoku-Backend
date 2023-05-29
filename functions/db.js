const mongoose = require('mongoose')
const mongoURI ="mongodb+srv://nitingangwani982000:Gangwani098@cluster0.48p0wxa.mongodb.net/sudoku"
const connectToMongo =()=>{
    mongoose.connect(mongoURI,{useNewUrlParser: true, useUnifiedTopology: true},()=>{
        console.log("connected")
    })
}
module.exports=connectToMongo;
