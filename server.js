//Step 2 - Create server.js and define server here as below code. 

const express = require("express")
const cors = require("cors")
const server = express()
const apiPostsRouter = require("./apiPosts/apiPosts-router.js")

server.use(express.json())
server.use(cors())

server.use("/api/posts", apiPostsRouter)

server.get("/", (req, res) => {
    res.send(`
    <h1>API POSTS PROJECT</h1>`)
})

module.exports = server