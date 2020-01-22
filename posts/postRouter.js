const express = require("express");

const Posts = require("./postDb.js"); //This MUST BE HERE to work!!!

const router = express.Router();

router.get("/", (req, res) => {
  Posts.get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Error getting posts" });
    });
});

router.get("/:id", validatePostId, (req, res) => {
  res.status(200).json(req.post);
});

router.delete("/:id", validatePostId, (req, res) => {
  const { id } = req.params;
  Posts.remove(id).then(() => res.status(204).end());
});

router.put("/:id", validatePostId, (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  Posts.update(id, { text }).then(() => {
    Posts.getById(id)
      .then(post => res.status(200).json(post))
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Error getting post" });
      });
  });
});

// custom middleware

function validatePostId(req, res, next) {
  const { id } = req.params;
  Posts.getById(id).then(post => {
    if (post) {
      req.post = post;
      next();
    } else {
      res.status(404).json({ error: "The specified post does not exist" });
    }
  });
}

module.exports = router;
