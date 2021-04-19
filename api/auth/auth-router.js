//IMPORTS
const express = require("express");
const { checkUsernameFree, checkUsernameExists, checkPasswordLength } = require("./auth-middleware");
const Users = require("../users/users-model");
const bcrypt = require("bcryptjs");

//INSTANCE OF ROUTER
const router = express.Router();

/**
  1 [POST] /api/auth/register { "username": "sue", "password": "1234" }

  response:
  status 200
  {
    "user_id": 2,
    "username": "sue"
  }

  response on username taken:
  status 422
  {
    "message": "Username taken"
  }

  response on password three chars or less:
  status 422
  {
    "message": "Password must be longer than 3 chars"
  }
 */

  router.post("/register", checkUsernameFree, checkPasswordLength, (req, res, next)=>{
    
    const { username, password } = req.body;
    
    const hash = bcrypt.hashSync(password, 8);

    const newUser = {
      username: username,
      password: hash
    }

    Users.add(newUser)
    .then((newestUser)=>{
      res.status(200).json(newestUser);
    })
    .catch((err)=>{
      next(err);
    })
  })

/**
  2 [POST] /api/auth/login { "username": "sue", "password": "1234" }

  response:
  status 200
  {
    "message": "Welcome sue!"
  }

  response on invalid credentials:
  status 401
  {
    "message": "Invalid credentials"
  }
 */

router.post("/login", checkUsernameExists, async (req, res, next)=>{

const { username, password } = req.body;

const [user] = await Users.findBy(username);

if(user && bcrypt.compareSync(password, user.password)){

  req.session.user = user;
  res.json({message: `Welcome back ${username}`});
} else {
  res.status(401).json({message: "Invalid credentials"});
}

})


/**
  3 [GET] /api/auth/logout

  response for logged-in users:
  status 200
  {
    "message": "logged out"
  }

  response for not-logged-in users:
  status 200
  {
    "message": "no session"
  }
 */

 
// Don't forget to add the router to the `exports` object so it can be required in other modules

module.exports = router;