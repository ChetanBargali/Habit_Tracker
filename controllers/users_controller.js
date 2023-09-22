const User = require('../models/user');

// Function to render the sign-up page
module.exports.signUp = async function(req, res) {
    try {
        return res.render('user-sign-up', {
            title: "Sign Up"
        });
    } catch (error) {
        console.log('Error in user_controller/SignUp', error);
        return res.redirect('back');
    }
}

// Function to render the sign-in page
module.exports.signIn = async function(req, res) {
    try {
        return res.render('user-sign-in', {
            title: "Sign In"
        });
    } catch (error) {
        console.log('Error in user_controller/SignIn', error);
        return res.redirect('back');
    }
}

// Function to create a new user
module.exports.create = function(req, res) {
    // Check if password and confirm_password match
    if (req.body.password != req.body.confirm_password) {
        req.flash('error', "Password does not match!");
        return res.redirect('back'); // Redirect back if passwords don't match
    }

    // Check if a user with the same email already exists
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                // If the user doesn't exist, create the user
                req.flash('success', 'User Created Successfully!!!');
                return User.create(req.body) // Creating a new user record
                    .then(createdUser => {
                        return res.redirect('/users/sign-in'); // Redirect to sign-in after successful user creation
                    });
            } else {
                req.flash('error', 'User Already Exists!');
                return res.redirect('back'); // Redirect back if the user already exists
            }
        })
        .catch(err => {
            req.flash('error', err); // Log any error
            return res.redirect('back'); // Redirect back with an error message
        });
};

// Function to create a session for an existing user (log in)
module.exports.createSession = async function(req, res) {
    req.flash('success', 'Logged In Successfully!!!');
    return res.redirect('/');
}

// Function to destroy a session (log out)
module.exports.destroySession = function(req, res) {
    req.logout(function(err) {
        if (err) {
            req.flash('error', err);
            return res.redirect('/');
        }
        req.flash('success', 'Logged Out Successfully!!!');
        return res.redirect('/');
    });
};

// Function to render the forget password page
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

// Function to reset the password
module.exports.resetPassword = async function(req, res) {
    try {
        let user = await User.findOne({ email: req.body.email });

        if (!user) {
            req.flash('error', 'User not found');
            return res.render('/users/sign-up')
        }
        if (req.body.password == req.body.confirm_password) {
            user.password = req.body.password;
            await user.updateOne({ password: req.body.password });
            req.flash('success', 'Password reset successfully');
            return res.redirect('/users/sign-in');
        }
    } catch (error) {
        req.flash('error', 'Error resetting password: ' + error.message);
        return;
    }
}
