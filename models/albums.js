//schema for album collection
const mongoose = require("mongoose");

const albumSchema = mongoose.Schema({
    album_name:{
        type : String,
        required : true
    },
    release_date:{
        type:String,
        required : true
    },
    genre : {
        type:String,
        required:true
    },
    price : {
        type: String,
        required :true
    },
    description : [],

    createdAt: {
        type : Date,
        default : Date.now()
    }
});

module.exports = mongoose.model("album",albumSchema); //export model with userSchema