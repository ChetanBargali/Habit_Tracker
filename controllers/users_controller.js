const User=require('../models/user')

// redirects the user to sign up page
module.exports.signUp= async function(req,res){
    try{
        return res.render('user-sign-up',{
            title:"Sign Up"
        });
    }catch(error){
        console.log('Error in user_controller/SignUp',error);
        return res.redirect('back');
    }
}

// redirects the user to sign up page
module.exports.signIn= async function(req,res){
    try{
        return res.render('user-sign-in',{
            title:"Sign In"
        });
    }catch(error){
        console.log('Error in user_controller/SignIn',error);
        return res.redirect('back');
    }
}

// creates a new user
module.exports.create=async function(req,res){
    try{
        if(req.body.password!=req.body.confirm_password){
            return res.redirect('back');
        }
        let user=await User.findOne({email:req.body.email});
        //if user is not present
        if(!user){
            await User.create(req.body);
            return res.redirect("/users/sign-in");
        }
    }catch(error){
        console.log("Error in creating a user:",error);
        return res.redirect('back');
    }
}

// signs in existing user
module.exports.createSession = async function(req, res) {
    return res.redirect('/');
}


//for sign out
module.exports.destroySession = function(req, res) {
    req.logout(function(err) {
        if (err) {
            console.log('Error in logging out:', err);
            return res.redirect('/');
        }
        return res.redirect('/');
    });
};


// redirects the user to foget password page
module.exports.forgetPassword = async function(req, res) {
    try {
        return res.render('forget_password', {
            title: "Reset Password"
        });
    } catch (error) {
        console.log('Error in usersController/forgetPassword: ', error);
        return res.redirect('back');
    }
}

// reset password
module.exports.resetPassword = async function(req, res) {
    try {
        let user = await User.findOne({email : req.body.email});

        if(!user) {
            return res.render('/users/sign-up')
        }
        if(req.body.password==req.body.confirm_password) {
            user.password = req.body.password;
            await user.updateOne({password : req.body.password});
            return res.redirect('/users/sign-in');
        }
    } catch (error) {
        console.log('Error in habitController/resetPassword: ', error);
        return;
    }
}