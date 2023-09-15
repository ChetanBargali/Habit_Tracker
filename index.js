const express=require('express');
const app=express();
const port=7000;

const expressLayouts=require('express-ejs-layouts');

const db=require('./config/mongoose');

//set up view Engine
app.set('view engine','ejs');
app.set('views','./views');

//use static files
app.use(express.static('./Assets'));


//use express router
app.use('/', require('./routes'));
app.use(expressLayouts);

//make the app listen
app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on the port: ${port}`);
});