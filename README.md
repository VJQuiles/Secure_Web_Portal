# Secure Web Portal 
Welcome to the Secure Web Portal, a backend application where you can manage your very own bookmarks. 

## Description
This project uses the concepts of local authorization and OAuthorization to create and login users, as well as give them the ability to perform CRUD operations on custom bookmarks. 

## Getting Started
### Dependencies
    "bcrypt": "^6.0.0",
    "dotenv": "^17.2.1",
    "express": "^5.1.0",
    "express-session": "^1.18.2",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.18.0",
    "passport": "^0.7.0",
    "passport-github2": "^0.1.12",
    "randomstring": "^1.3.1",

    "devDependencies": {
    "nodemon": "^3.1.10"
  }

### Installing
You can run npm i in order to install all necessary packages. 

### Executing program
Nodemon is set in the package.json file to allow you to run the program with npm run dev. 

The use of a route testing application like postman is also recommended. 

Be sure to save tokens that are generated in order to use them for the bookmark routes. 

## Authors
Vincent J. Quiles

## Reflection
This project, in my opinion, is the most prominent example I can think of(yes, partially because it's most recent) of information building on itself. I felt I could see a very clear through line from our time learning express.js and node.js, to where we are now with authentication and verification. 

The most beneficial thig that I did, was review some key lessons, following along and building my Basic_Login project into something larger, encompassing all topics covered. This, in addition to my Secure Record Storage Repo really did the leg work of this project. And through that, I felt the concepts really set in, in terms of how we are controlling who can see what, and how that process is facilitated. It has also given me a lot to consider when it comes to not only security in applications i build, but also how i work to protect myself as a consumer in this economy. 

I didn't find myself struggling much through this project. As stated, I had an excellent road map. I would say the biggest challenges I hit were really just plotting out the file structure and the route tree. That mostly involved a little abstract thinking and attention to detail 

## Acknowledgments

https://gist.github.com/DomPizzie/7a5ff55ffa9081f2de27c315f5018afc

My colleagues James, Maria, and Rachida helped to debug an issue with token generation on log in. Blocked myself with a return statement.

Basic_Login Repo plus more from covered materials in class

Secure_Web_Storage

## Planning

Secure Web Portal

File setup

config
-connection.js
-github-strategy.js
controllers
-userController.js
-bookmarkController.js
middleware
-auth.js
-admin.js
models
-User.js
-Bookmark.js
routes
-userRoutes.js
-bookmarkRoutes.js

-server.js

Route tree

server.js(bottom of the funnel)

api/users

routes
 apiRoutes
  index.js(/users, /bookmarks)
  userRoutes.js(userController)
    /localRegister
    /localLogin

    /oauth(register/login)

  bookmarkRoutes.js(bookmarkController)
    CRUD operations - tethered to user - must register/login before bookmark usage - verifyUser will also be called in these operations
    
    /postOne(create)
    /getAll
    /getOne
    /putOne(update one)
    /deleteOne

 index.js(/apiRoutes)
