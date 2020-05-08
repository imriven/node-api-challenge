const express = require('express');
const cors = require("cors")
const server = express();
const userRouter = require("./projects/projectRouter") //project
const postRouter = require("./actions/actionRouter") //action
server.use(express.json())
server.use(logger)
server.use(cors())
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});
// logger before router
server.use("/api/projects", projectRouter) 
server.use("/api/actions", actionRouter) 
//custom middleware
//logger should be first after express.json - executed in order

function logger(req, res, next) {
  console.log(req.method)
  console.log(req.url)
  console.log(Date.now())
  next()
}

module.exports = server;
