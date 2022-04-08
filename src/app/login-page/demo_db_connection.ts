const mysql = require('mysql');

const con = mysql.createConnection({
  host: "83.233.24.175",
  port: "3306",
  user: "ltu_user",
  password: "digiby"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

