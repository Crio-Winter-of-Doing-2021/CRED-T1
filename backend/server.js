const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({path: "./config.env"});
const app = require("./app");

const PORT = 8000;

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

const connectToDatabase = async function(){
    try{
        await mongoose.connect( DB,  {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true} );
        console.log("Database connection successfull");
    }catch(err){
        console.log(err);
    }
}

connectToDatabase();

app.listen( process.env.PORT || PORT, function(){
    console.log(`Server listening to port ${PORT}`);
})