const mysql = require("mysql2");

// // create the database connection
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "cortorreal1634",
  database: "company_db",
});
connection.connect(function (error) {
  if (error) {
    console.log(error);
  }
});
module.exports = connection;