const Habit = require('../models/habit');
const User = require('../models/user');

// Function to create a new habit
module.exports.createHabit = async function (req, res) {
    try {
      // Check if a habit with the same title and user already exists
      let habit = await Habit.findOne({
        title: req.body.title,
        user: req.user._id,
      }).populate();

      if (habit) {
        console.log('Habit exists');
        req.flash('success', 'Habit Already Exist!!!');
        return res.redirect('/');
      } else {
        // Create a new habit if it doesn't exist
        let newHabit = await Habit.create({
          title: req.body.title,
          desc: req.body.desc,
          user: req.user._id,
          dates: [{ date: await getTodayDate(), complete: "none" }],
        });
        req.flash('success', 'Habit Created Successfully');
        return res.redirect('/');
      }
    } catch (error) {
      console.log('Error in habitController/createHabit: ', error);
      return res.status(500).send('Internal Server Error');
    }
}

// Function to get the current date (formatted as day month)
function getTodayDate(){
  var today = new Date();
  let date = today.getDate();
  let month = today.getMonth() + 1;

  let fullDate = date + " " + month;
  return fullDate;
}

// Function to delete a habit
module.exports.deleteHabit = async function(req, res) {
    try {
        let id = req.query.id;
        let user = req.user._id;

        // Delete the habit with the given id and user
        await Habit.deleteOne({ _id: id, user: user });
        req.flash('success', 'Habit Deleted Successfully');
        return res.redirect('/');
        
    } catch (error) {
        console.log('Error in habitController/deleteHabit', error);
        return;
    }
}

// Function to edit a habit's title/description
module.exports.editHabit = async function(req, res) {
  try {
      let newTitle = req.body.title;
      let newDesc = req.body.desc;
      let id = req.query.id;
      let user = req.user._id;

      // Find and update the habit with the new title and description
      let updatedResult = await Habit.findByIdAndUpdate(
          {
              _id: id,
              user: user
          }, {
              title: newTitle,
              desc: newDesc
          }
      );
      return res.redirect('/');
      
  } catch (error) {
      console.log('Error in habitController/editHabit', error);
      return;
  }
}

// Function to toggle the status of a habit on a specific date
module.exports.toggleStatus = async function(req, res) {
  try {
      let id = req.query.id;
      let date = req.query.date;
      const habit = await Habit.findById(id);
      console.log(date);

      if (!habit) {
        console.log('Habit not present!');
        return res.redirect('/');
      }

      // Take out the date array of the habit.
      let dates = habit.dates;
      let found = false;
      
      // Change the complete status of the habit for the given date.
      dates.find((item, index) => {
          if (item.date == date) {
              if (item.complete === 'y') {
                  item.complete = 'n';
              } else if (item.complete === 'n') {
                  item.complete = 'x';
              } else if (item.complete === 'x') {
                  item.complete = 'y';
              }
              found = true;
          }
      });

      if (!found) {
          dates.push({ date: date, complete: 'y' });
      }
      
      // Save the updated dates.
      habit.dates = dates;
      await habit.save();
      return res.redirect('/');
      
  } catch (error) {
      console.log('Error in habitController/toggleStatus', error);
      return;
  }
}
