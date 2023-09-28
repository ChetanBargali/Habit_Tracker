const mongoose=require('mongoose');
//connect database
mongoose.connect(process.env.MONGO_URL||'mongodb://127.0.0.1:27017/Habit_Tracker');

//acquire the connection(to check if it is sucessful)
const db=mongoose.connection;


//error
db.on('error',console.error.bind(console,"Error connecting to mongoDB"));


//if succesfull and running the print the massege 
db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});

module.exports=db;