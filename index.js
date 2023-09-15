const express=require('express');
const app=express();
const port=7000;






//use express router
app.use('/', require('./routes'));

//make the app listen
app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on the port: ${port}`);
});