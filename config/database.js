const mongoose = require("mongoose");

const MONGOURI = "mongodb://localhost:27017/innovents"; //running on localhost

const startMongoServer = async () => {
    try {
            await mongoose.connect(MONGOURI, {
                useNewUrlParser: true //this will parse the mongoDB connection string
            });
            console.log("connected to mongo db");
             } 
            catch (error) 
            {
            console.log(error)
            throw error;
             }
        };

module.exports = startMongoServer;