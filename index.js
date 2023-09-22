const express=require('express');
const app=express();
const port=9000;

//import cookie-parser
const cookieParser=require('cookie-parser');

const expressLayouts=require('express-ejs-layouts');

// used for session cookies
const session = require("express-session");
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');

const db=require('./config/mongoose');

// require connect-flash
const flash = require('connect-flash');
const customMware=require('./config/flash_middleware');


app.use(express.urlencoded({ extended: true })); //URL-encoded data is commonly used when sending form data from a web page to a server.
app.use(cookieParser());

app.use(expressLayouts);

//extract style and script from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScriptsgit', true);

//set up view Engine
app.set('view engine','ejs');
app.set('views','./views');

//use static files
app.use(express.static('./Assets'));

//mongo store is used to store the session cookie in the db
app.use(session({
    name:'habitTracker',
    //TODO change later
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: MongoStore.create(
        {
            mongoUrl:'mongodb://127.0.0.1:27017/Habit_Tracker',
            autoRemove:'disabled'
        },
        function(err){
            console.log("Error in Mongo Store");
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

//used as middleware when app is initialized it is called and user will set in the locals
app.use(passport.setAuthenticatedUser);

// flash middleware
app.use(flash());
app.use(customMware.setFlash);

//use express router
app.use('/', require('./routes'));


//make the app listen
app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on the port: ${port}`);
});