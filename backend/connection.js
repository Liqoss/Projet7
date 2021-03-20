const mysql = require('mysql');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pierre",
    database: "groupomania",
    insecureAuth: true
  });

  module.exports = db;