const express=require('express');
const router=express.Router();

const habitController=require('../controllers/habit_controller');


//create new habit
router.post('/create-habit', habitController.createHabit);

// delete the habit
router.get('/delete-habit', habitController.deleteHabit);

// updates habit
router.post('/edit-habit', habitController.editHabit);

module.exports=router;