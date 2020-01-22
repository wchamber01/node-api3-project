const express = require("express");
const server = express();

server.use(express.json());
server.use(logger);

const userRouter = require("./users/userRouter.js");
server.use("/api/users", userRouter);

const postRouter = require("./posts/postRouter.js");
server.use("/api/posts", postRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware
function logger(req, res, next) {
  const { method, originalUrl } = req;
  const date = Date.now();
  timeStamp = date.toString();
  console.log(`${method} to ${originalUrl} @ ${timeStamp}`);
  next();
}

module.exports = server;
