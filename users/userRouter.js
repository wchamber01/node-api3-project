const express = require("express");

const router = express.Router();

const Users = require("./userDb");

router.post("/", (req, res) => {
  // do your magic!
});

router.post("/:id/posts", (req, res) => {
  // do your magic!
});

//GET all users
router.get("/", (req, res) => {
  Users.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Error getting users" });
    });
});

//GET single user by id
router.get("/:id", (req, res) => {
  const { id } = req.params.id;
  Users.getById(id)
    .then(user => {
      if (!user.id) {
        res.status(404).json({ error: "The specified user does not exist." });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." });
    });
});

//GET all posts by user id
router.get("/:id/posts", (req, res) => {
  // do your magic!
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
