const express=require('express');
const router=express.Router();

const habitController=require('../controllers/habit_controller');


//create new habit
router.post('/users/habit/create-habit', habitController.createHabit);

// delete the habit
router.get('/delete-habit', habitController.deleteHabit);

module.exports=router;