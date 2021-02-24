const express = require("express");
const bodyParser = require('body-parser')
const customers = require('./backend/api/routes/customers')

// var conn = require("./backend/db2")

const app = express();
app.use(bodyParser.json())
app.use(customers)
// conn.query("SELECT * FROM users.customers;",(err, res, fields) =>{
//    res.forEach(element => {
//        console.log(element)
//    });
// })


const port = process.env.PORT || 3001;
app.listen(port, () => console.log("Listening to", port));