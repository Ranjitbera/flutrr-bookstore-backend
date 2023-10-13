const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({

    title:{
        type: String,
        default: null
    },
    author:{
        type: String,
        default: null
    },   
    url:{
        type: String,
        require: true
    },
    overallRating:{
        type:Number,
        default:5
    }
  
},{timestamps: true, versionkey: false})


module.exports = mongoose.model('BookData', BookSchema);