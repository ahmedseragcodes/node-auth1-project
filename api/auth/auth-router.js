const express = require("express");
const Users = require("../users/users-model");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const { restricted, checkUsernameFree, checkUsernameExists, checkPasswordLength } = require("./auth-middleware");

const router = express.Router();

// Require `checkUsernameFree`, `checkUsernameExists` and `checkPasswordLength`
// middleware functions from `auth-middleware.js`. You will need them here!


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

  //ENDPOINTS

  //[POST] Registration
 
  router.post("/register", (req, res, next)=>{

    const user = req.body;
  
    const { username, password } = req.body;
  
    const hash = bcrypt.hashSync(password, 8);
  
    user.password = hash;
  
    Users.add(user)
    .then((addedUser)=>{
      res.status(201).json(addedUser[0]);
    })
    .catch((err)=>{
      next(err);
    }) 
  
  })

  //[POST] Login

  router.post("/login", (req, res, next)=>{


    const { username, password } = req.body;

    Users.findBy({username})
    .then((user)=>{
      if(user && bcrypt.compareSync(password, user.password)){
        req.session.user = user;
        res.json({
          message: `Welcome ${username}`
        })
      } else {
        res.status(401).json({message: "Invalid Credentials"});
      }
    })
    .catch((err)=>{
      next(err);
    })




  })

module.exports = router;