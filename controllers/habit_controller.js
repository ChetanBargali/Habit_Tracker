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

  // this fucntion will return the current data, which will helpful for getting the range of dates
function getTodayDate(){
  var today = new Date();
  let date = today.getDate();
  let month = today.getMonth()+1;

  let fullDate = date + " " + month;
  return fullDate;
}
  

// this function removes the habit
module.exports.deleteHabit = async function(req, res) {
    try {
        let id = req.query.id;
        let user = req.user._id;

        await Habit.deleteOne({ _id : id, user: user });
        // req.flash('success', 'Habit Deleted Successfully');
        return res.redirect('/');
        
    } catch (error) {
        console.log('Error in habitController/deleteHabit', error);
        return;
    }
}

// this function will edit the habit title/desc
module.exports.editHabit = async function(req, res) {
  try {
      let newTitle = req.body.title;
      let newDesc = req.body.desc;
      let id = req.query.id;
      let user = req.user._id;

      let updatedResult = await Habit.findByIdAndUpdate(
          {
              _id: id,
              user: user
          }, {
              title: newTitle,
              desc: newDesc
          }
      );
      // console.log(updatedResult);
      // req.flash('success', 'Habit Updated Successfully');
      return res.redirect('/');
      
  } catch (error) {
      console.log('Error in habitController/editHabit', error);
      return;
  }
}