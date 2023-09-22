// Import necessary models
const User = require('../models/user');
const Habit = require('../models/habit');

// Function to render the home page
module.exports.home = async function(req, res) {
    if (req.user) {
        // Find habits associated with the logged-in user
        let habits = await Habit.find({ user: req.user._id }); 
        
        return res.render('home', {
            title: "Habit Tracker",
            habits: habits,
            weeklyDates: await getOneWeekDate()
        });
    } else {
        // Render the home page without habits if no user is logged in
        return res.render('home', {
            title: "Home"
        });
    }
}

// Function to generate an array of dates for the upcoming week
function getOneWeekDate() {
    let months = ["", "Jan", "Feb", "March", "Apr", "May", "June", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    let dates = [];
    for (let i = 6; i >= 0; i--) {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - i);
        let mm = currentDate.getMonth() + 1;
        mm = months[mm];
        let dd = currentDate.getDate();
        if (dd < 10) dd = '0' + dd;
        dates.push(mm + " " + dd);
    }
    return dates;
}
