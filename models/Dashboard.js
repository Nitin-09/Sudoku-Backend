const mongoose =require('mongoose')
const { Schema } = mongoose;
const DashboardSchema = new Schema({
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name:{
        type:String,
        required:true
    },
    game:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'game'
    },
    level:{
        type:String,
        required:true
    },
    time:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
})

module.exports =mongoose.model('Dashboard',DashboardSchema)