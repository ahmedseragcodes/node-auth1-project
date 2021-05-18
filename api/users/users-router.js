const Users = require("./users-model");
const express = require("express");
const bcrypt = require("bcryptjs");

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

//[GET] ALL Users

router.get("/", (req, res, next)=>{

  Users.find()
  .then((allUsers)=>{
    res.status(200).json(allUsers);
  })
  .catch((err)=>{
    next(err);
  })

});

//[GET] User By Username

router.get("/username/:username", (req, res, next)=>{

  const { username } = req.params;

  Users.findBy({username})
  .then((specificUser)=>{
    res.status(200).json(specificUser);
  })
  .catch((err)=>{
    next(err);
  })

})

//[GET] User By Id

router.get("/:id", (req, res, next)=>{

  const { id } = req.params;

  Users.findById(id)
  .then((specUser)=>{
    res.status(200).json(specUser[0]);
  })
  .catch((err)=>{
    next(err);
  })

});

//[POST] New User / Registration

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

module.exports = router;