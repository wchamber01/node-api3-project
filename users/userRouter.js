const express = require("express");

const router = express.Router();

const Users = require("./userDb.js");
const Posts = require("../posts/postDb.js");

//Add new user
router.post("/", validateUser, (req, res) => {
  const { name } = req.body;
  Users.insert({ name })
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Error adding user" });
    });
});

//Add new user post
router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  const post = req.body;
  Posts.insert(post)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Error adding post" });
    });
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
router.get("/:id", validateUserId, (req, res) => {
  res.status(200).json(req.user);
  // const { id } = req.params;
  // Users.getById(id)
  //   .then(user => {
  //     if (user) {
  // res.status(200).json(req.user);
  //       } else {
  //         res.status(404).json({ error: "The specified user does not exist." });
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       res
  //         .status(500)
  //         .json({ error: "The user information could not be retrieved." });
  //     });
});

//GET all posts by user id
router.get("/:id/posts", validateUserId, (req, res) => {
  const { id } = req.params;
  Users.getUserPosts(id)
    .then(posts => res.status(200).json(posts))
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Error getting user posts" });
    });
});

//Delete user
router.delete("/:id", validateUserId, (req, res) => {
  const { id } = req.params;
  Users.remove(id).then(() => res.status(204).end());
});

//Update user
router.put("/:id", validateUserId, (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  Users.update(id, { name }).then(() => {
    Users.getById(id)
      .then(user => res.status(200).json(user))
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Error getting user" });
      });
  });
});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;
  Users.getById(id).then(user => {
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(404).json({ error: "The specified user does not exist" });
    }
  });
}

function validateUser(req, res, next) {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ error: "Name required" });
  } else if (typeof name !== "string") {
    res.status(400).json({ error: "Name must be a string" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  const { id: user_id } = req.params;
  const { text } = req.body;
  if (!req.body) {
    res.status(400).json({ error: "Post requires body" });
  } else if (!text) {
    res.status(400).json({ error: "Post requires text" });
  } else {
    req.body = { user_id, text };
    next();
  }
}

module.exports = router;
