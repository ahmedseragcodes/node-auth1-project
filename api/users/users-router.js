const express = require("express");
const Users = require("./users-model");

const router = express.Router();

// Require the `restricted` middleware from `auth-middleware.js`. You will need it here!

/**
  [GET] /api/users

  This endpoint is RESTRICTED: only authenticated clients
  should have access.

  response:
  status 200
  [
    {
      "user_id": 1,
      "username": "bob"
    },
    // etc
  ]

  response on non-authenticated:
  status 401
  {
    "message": "You shall not pass!"
  }
 */


// Don't forget to add the router to the `exports` object so it can be required in other modules

//ENDPOINTS

//[GET] All Users

router.get("/", (req, res, next)=>{

Users.find()
.then((allUsers)=>{
  res.status(200).json(allUsers);
})
.catch((err)=>{
  next(err);
})

})





module.exports = router;