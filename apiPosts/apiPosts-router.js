//Step 3 - Define the router as below code shows. 

const express = require("express")
const router = express.Router()
const posts = require("../data/db.js")

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

module.exports = router

// const express = require("express")
// const router = express.Router()
// const Hubs = require('./hubs-model.js');

// router.get('/', (req, res) => {
//     Hubs.find(req.query)
//     .then(hubs => {
//       res.status(200).json(hubs);
//     })
//     .catch(error => {
//       // log error to database
//       console.log(error);
//       res.status(500).json({
//         message: 'Error retrieving the hubs',
//       });
//     });
//   });
  
//   router.get('/:id', (req, res) => {
//     Hubs.findById(req.params.id)
//     .then(hub => {
//       if (hub) {
//         res.status(200).json(hub);
//       } else {
//         res.status(404).json({ message: 'Hub not found' });
//       }
//     })
//     .catch(error => {
//       // log error to database
//       console.log(error);
//       res.status(500).json({
//         message: 'Error retrieving the hub',
//       });
//     });
//   });

//   router.get("/:id/messages", (req, res) => {
//       const { id } = req.params

//       Hubs.findHubMessages(id)
//       .then(messages => {
//           if(messages) {
//               res.status(200).json(messages)
//           } else {
//               res.status(404).json({ message: "Id not found" })
//           }
//       })
//       .catch(err => {
//           console.log(err)
//           res.status(500).json({ message: "db error retrieving hub" })
//       })
//   })

//   // See NOTES after lecture as not enough time
// //   router.post("/:id/messages", (req, res) => {
// //       const { id } = req.params
// //   })
  
//   router.post('/', (req, res) => {
//     Hubs.add(req.body)
//     .then(hub => {
//       res.status(201).json(hub);
//     })
//     .catch(error => {
//       // log error to database
//       console.log(error);
//       res.status(500).json({
//         message: 'Error adding the hub',
//       });
//     });
//   });
  
//   router.delete('/:id', (req, res) => {
//     Hubs.remove(req.params.id)
//     .then(count => {
//       if (count > 0) {
//         res.status(200).json({ message: 'The hub has been nuked' });
//       } else {
//         res.status(404).json({ message: 'The hub could not be found' });
//       }
//     })
//     .catch(error => {
//       // log error to database
//       console.log(error);
//       res.status(500).json({
//         message: 'Error removing the hub',
//       });
//     });
//   });
  
//   router.put('/:id', (req, res) => {
//     const changes = req.body;
//     Hubs.update(req.params.id, changes)
//     .then(hub => {
//       if (hub) {
//         res.status(200).json(hub);
//       } else {
//         res.status(404).json({ message: 'The hub could not be found' });
//       }
//     })
//     .catch(error => {
//       // log error to database
//       console.log(error);
//       res.status(500).json({
//         message: 'Error updating the hub',
//       });
//     });
//   });


// module.exports = router