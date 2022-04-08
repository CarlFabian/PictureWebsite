var mysql = require('mysql');

var con = mysql.createConnection({
  host: "83.233.24.175:3306",
  user: "ltu_user",
  password: "digiby"
});

con.connect(function(err: any) {
  if (err) throw err;
  console.log("Connected!");
});

