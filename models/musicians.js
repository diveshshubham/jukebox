//schema for musician collection
const mongoose = require("mongoose");

const musicianSchema = mongoose.Schema({
    musician_name:{
        type : String,
        required : true
    },
    
    musician_type: {
        type: String,
        required :true
    },
    createdAt: {
        type : Date,
        default : Date.now()
    }
});

module.exports = mongoose.model("musician",musicianSchema); //export model with musicianSchema