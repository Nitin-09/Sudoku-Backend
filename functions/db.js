const mongoose = require('mongoose')
const mongoURI ="mongodb+srv://nitingangwani982000:Nitin09@cluster0.tztc33s.mongodb.net/sudoku"
const connectToMongo =()=>{
    mongoose.connect(mongoURI,{useNewUrlParser: true, useUnifiedTopology: true},()=>{
        console.log("connected")
    })
}
module.exports=connectToMongo;
