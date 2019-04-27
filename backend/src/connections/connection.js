const mysql = require("mysql");

const connection = mysql.createConnection({
  user: "faizun",
  password: "empatdan1",
  host: "localhost",
  database: "final_project",
  port: "3306"
});

module.exports = connection;
