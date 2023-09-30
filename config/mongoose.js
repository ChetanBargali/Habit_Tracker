const mongoose=require('mongoose');
require('dotenv').config()
//connect database
mongoose.connect(process.env.MONGO_URL);

//acquire the connection(to check if it is sucessful)
const db=mongoose.connection;


//error
db.on('error',console.error.bind(console,"Error connecting to mongoDB"));


//if succesfull and running the print the massege 
db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});

module.exports=db;
