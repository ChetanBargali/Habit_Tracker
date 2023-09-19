const express=require('express');
const router=express.Router();
const passport = require('passport');

const usersController=require('../controllers/users_controller');
router.get('/sign-up', usersController.signUp); // Route to render user sign-up page
router.get('/sign-in', usersController.signIn); // Route to render user sign-in page

router.post('/create', usersController.create);
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersController.createSession);
router.get('/sign-out', usersController.destroySession);

router.use('/habit', require('./habit'));
// takes to forget password page
router.get('/forget-password', usersController.forgetPassword);
// changes the password
router.post('/reset-password', usersController.resetPassword);

module.exports=router;