var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "p@33word",
  database: "users",
  port: 3306,
  charset: "utf8mb4",
  multipleStatements: true
});

connection.connect(err => {
  if (!err) {
    console.log("DB Connection Succeeded");
  } else {
    console.log(JSON.stringify(err))
    console.log("DB Connection Failed");
  }
});

module.exports = connection;