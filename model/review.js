const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({

    bookid:{
        type: String,
        require:true
    },
    name:{
        type: String,
        default: null
    },   
    rating:{
        type: String,
        require: true
    },
    comment:{
        type:String,
    }
  
},{timestamps: true, versionkey: false})


module.exports = mongoose.model('ReviewData', ReviewSchema);