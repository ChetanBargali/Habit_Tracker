const Habit = require('../models/habit');
const User = require('../models/user');

module.exports.createHabit = async function (req, res) {
    try {
      let habit = await Habit.findOne({
        title: req.body.title,
        user: req.user._id,
      }).populate();
      if (habit) {
        console.log('Habit exists');
        return res.redirect('/');
      } else {
        let newHabit = await Habit.create({
          title: req.body.title,
          desc: req.body.desc,
          user: req.user._id,
          dates: [{ date: await getTodayDate(), completed: "none" }],
        });
  
        return res.redirect('/');
      }
    } catch (error) {
      console.log('Error in habitController/createHabit: ', error);
      return res.status(500).send('Internal Server Error');
    }
  }
  

// this function removes the habit
module.exports.deleteHabit = async function(req, res) {
    try {
        let id = req.query.id;
        let user = req.user._id;

        await Habit.deleteOne({ _id : id, user: user });
        req.flash('success', 'Habit Deleted Successfully');
        return res.redirect('/');
        
    } catch (error) {
        console.log('Error in habitController/deleteHabit', error);
        return;
    }
}
