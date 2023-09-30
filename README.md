### Hosted link: [Habit Tracker](https://habit-tracker-75sd.onrender.com)

# HabitTracker

A web application which help you to create, update, delete and track your habit on daily basis. 
It is user specific app, which mean a user can track their habit, and mark it as done , or not done. 
The project is built using a tech stack consisting of Node.js for the server-side scripting.
Express for handling HTTP requests and routing.
MongoDB for storing and managing the data and EJS for rendering the views and templates.


## Usage
Once you have the application up and running, you can start using it by following these steps:
* Sing-up/Sign-in into your account.
* Click on the "Add Habit" button to create a new habit.
* Enter the name of the habit you want to track.
* Click on the "Save" button to save the habit.
* To mark a habit as complete/incomplete for the day, simply click on the corresponding icon.
* To delete a habit, click on the "Delete" icon next to it.
* To see today's habits, click on "Show Daily" button.
* To edit a habit, click on the "Edit" icon next to it.

## Folder Structure
```
Habit_Tracker
     Habit Tracker                             |--> forget_password.css            
    |                                          |--> header.css
    |               |--->css------------------>|--> home.css
    |--->assets---->|--->img                   |--> userSignIn.css
    |               |---> js-->home.js         |--> userSignUp.css
    |
    |               |--->flash_middleware.js
    |--->config---->|--->mongoose.js
    |               |--->passport_local_strategy.js
    |
    |                  |-->habit_controller.js
    |--->controllers-->|-->home_controller.js
    |                  |-->users_controller.js
    |
    |               |-->habit.js
    |--->models---->|
    |               |-->user.js
    |
    |              
    |               |-->habit.js
    |--->routes---->|-->index.js
    |               |-->users.js
    |
    |              
    |              |--->_header.ejs
    |              |--->daily_view.ejs
    |              |--->forget_password.ejs
    |--->views---->|--->home.ejs
    |              |--->layout.ejs
    |              |--->user-sign-in.ejs
    |              |--->user-sign-up.ejs
    |              |--->weekly_view.ejs
    |
    |-->node_modules
    |-->.gitignore
    |-->index.js
    |-->package-lock.json
    |-->package.json
    |-->README.md
```