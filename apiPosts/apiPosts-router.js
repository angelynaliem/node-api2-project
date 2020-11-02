//Step 3 - Define the router as below code shows. 

const express = require("express")
const router = express.Router()
const posts = require("../data/db.js")



// GET | /api/posts | Returns an array of all the post objects contained in the database.   
router.get("/", (req, res) => {
    posts.find(req.query)
    .then(post => {
        res.status(200).json(post)
    })
    .catch(error => {
        console.log("Error with router GET ", error)
        res.status(500).json({
            message: "Error retrieving the posts"
        })
    })
})

// GET | /api/posts/:id | Returns the post object with the specified id.  
router.get("/:id", (req, res) => {
    posts.findById(req.params.id)
    .then(post => {
        if(post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({ message: "post not found" })
        }
    })
    .catch(error => {
        console.log("Error with router GET ID ", error)
        res.status(500).json({ message: "Error retrieving the specified id post" })
    })
})

// GET | /api/posts/:id/comments | Returns an array of all the comment objects associated with the post with the specified id.   
router.get("/:id/comments", (req, res) => {
    const { id } = req.params
    posts.findPostComments(id)
    .then(comments => {
        if(comments) {
            res.status(200).json(comments)
        } else {
            res.status(404).json({ message: "Specified id comments not found" })
        }
    })
    .catch(error => {
        console.log("Error router GET id comments ", error)
        res.status(500).json({ message: "Database error retrieving the specified id comments" })
    })
})

// DELETE | /api/posts/:id | Removes the post with the specified id and returns the **deleted post object**. You may need to make additional calls to the database in order to satisfy this requirement.
router.delete("/:id", (req, res) => {
    posts.remove(req.params.id)
    .then(count => {
        if(count > 0) {
            res.status(200).json(count)
        } else {
            res.status(404).json({ message: "The specified id post has been deleted" })
        }
    })
    .catch(error => {
        console.log("Error router DELETE ", error)
        res.status(500).json({ message: "Error deleting the specified id post" })
    })
})

//PUT | /api/posts/:id | Updates the post with the specified `id` using data from the `request body`. Returns the modified document, **NOT the original**.  
router.put("/:id", (req, res) => {
    const changes = req.body
    posts.update(req.params.id, changes)
    .then(post => {
        if(post) {
            res.status(200).json(post)
        } else if(post.title === "" || post.contents === "") {
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        } else {
            res.status(404).json({ message: "The specified id post could not be found" })
        }
    })
    .catch(error => {
        console.log("Error router PUT ", error)
        res.status(500).json({ message: "Error updating the specified id post" })
    })
})

//POST | /api/posts | Creates a post using the information sent inside the `request body`.  
router.post("/", (req, res) => {
    const postBody = req.body
    if(postBody.title === "" || postBody.contents === "") {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        posts.insert(req.body)
        .then(post => {
            res.status(201).json(post)
    })
    .catch(error => {
        console.log("Error router POST ", error)
        res.status(500).json({ message: "Error adding the post" })
    })
}
})

//POST | /api/posts/:id/comments | Creates a comment for the post with the specified id using information sent inside of the `request body`. 
router.post("/:id/comments", async (req, res) => {
    const commentId = req.params.id
    const commentBody = req.body
    const newComment = {...commentBody, post_id: commentId}
   
    if(!commentId) {
        res.status(404).json({vmessage: "The post with the specified ID does not exist." }) //Does these IF specs need to be inside the Try Catch? Do I need to add any await/async-await? 
    } else if(commentBody.text === "") {
        res.status(400).json({ errorMessage: "Please provide text for the comment." })
    }

    try {
        const comment = await posts.insertComment(newComment)
        res.status(201).json(comment)
    } catch(error) {
        console.log("Error router POST id comment ", error)
        res.status(500).json({ error }) //WHEN DO YOU JUST WRITE 'error' and when do you write a message as above router request?
    }
})

module.exports = router
  