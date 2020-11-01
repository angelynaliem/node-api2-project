//Step 1: npm install, including express. Create index.js and code server to use express with destinated port as below. 


const server = require("./server.js")

const port = 5000

server.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
})
