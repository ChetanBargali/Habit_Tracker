// Import required modules
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Import the User model
const User = require('../models/user');

// Configure Passport for local authentication strategy
passport.use(
    new LocalStrategy(
        {
            usernameField: 'email', // Specify that the username field is 'email'
            passReqToCallback:true
        },
        async function(req,email, password, done) {
            try {
                // Find a user based on the provided email
                const user = await User.findOne({ email: email });
                
                // Check if user exists and password matches
                if (!user || user.password !== password) {
                    req.flash('error','Invalid Username/Password!');
                    return done(null, false); // No user found or incorrect password
                }
                
                return done(null, user); // User found and password matches
            } catch (err) {
                req.flash('error',err);
                return done(err); // Pass the error to the done callback
            }
        }
    )
);

// Serialize user to store in the session
passport.serializeUser(function(user, done) {
    done(null, user.id); // Store user's ID in the session
});

// Deserialize user from the session
passport.deserializeUser(async function(id, done) {
    try {
        const user = await User.findById(id);
        return done(null, user); // User found and deserialized
    } catch (err) {
        console.log('Error in finding the user ----> Passport');
        return done(err); // Pass the error to the done callback
    }
});


//check if the user is Authenticated
passport.checkAuthentication=function(req,res,next){
    //if user is signed in ,then pass on the request to the next function(controller's action) 
    if(req.isAuthenticated()){ //checked user signed in or not
        return next();
    }
    //if useris not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        /*req.user contains the current signed in user from the session cookieand we are justsending this to the locals
        for the views*/
        res.locals.user=req.user;
    }
    next();
}

// Export the configured passport instance
module.exports = passport;
