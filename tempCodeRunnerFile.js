const express = require("express");
const server = express();
const port = 1234; 

//we are using static mock data, 
//consider we are making an API call to the related service endpoint
const userData = require("./MOCK_DATA.json");
console.log(userData[0])

server.listen(port, ()=>{
   console.log("Server listening on", port)
});

console.log("hey")