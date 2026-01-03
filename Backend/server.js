require('dotenv').config();  
const http=require('http')

const {initializeSocket}=require('./socket')
const app = require("./app")
const port = process.env.PORT || 3000


const server = http.createServer(app)

initializeSocket(server);

server.listen(port,()=>{
    console.log(`server is runnning on ${port}`)
})