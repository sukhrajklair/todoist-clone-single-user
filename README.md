# Todoist Clone for single user 
This is a Todoist web-app clone for single user built from scratch using React (built-in and custom hooks, and context), Firebase and React Testing Library(Jest).

This project was completed following [this tutorial](https://www.youtube.com/watch?v=HgfA4W_VjmI).

# Install/Configure
1. Clone or download this repository
2. Open a terminal window and go to the project directory
3. Enter `yarn` command which will install all of the project's dependencies
4. Create a new firbase project and add a firestore database with three collections as follows:
  * projects: {
                name: String,
                projectId: String,
                userId: String
              }
  * tasks: {
                task: String,
                date: String,
                projectId: String,
                userId: String,
                archived: Boolean
              }
  * users: {
              firstName: String,
              lastName: String,
              userId: String
            }
5. Once the firebase project has been created, use the information provided to intialize firestore in your project inside of './firebase.js'

# Run
1. Enter `yarn start` command in the termial. The app can then be accessed at `localhost:3000`.

# Test
1. The project comes with predefined test cases for all of its components. Simply execute `yarn test` in the terminal to start testing. If you add any new components to the app, you might need to add more tests.

# Potential Features
1. Multi-user support using authentication
