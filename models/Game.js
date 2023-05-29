const mongoose =require('mongoose')
const { Schema } = mongoose;
const GameSchema = new Schema({
    game:{
        type: Array,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
})

module.exports =mongoose.model('Game',GameSchema)