

const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "83.233.24.175",
  port: "3306",
  user: "ltu_user",
  password: "digiby",
  database: 'picture_database'
});

const getPicture = (request, response) => {
  pool.query('SELECT file_path FROM picture WHERE picture_id = 1', (error, results) => {
    if (error) {
      throw error
    }
    console.log(results);
  })
}


const con = mysql.createConnection({
  host: "83.233.24.175",
  port: "3306",
 user: "ltu_user",
 password: "digiby"
});

const getPictures = (request, response) => {
  con.query('SELECT file_path FROM picture WHERE picture_id = 1', (error, results) => {
    if (error) {
      throw error
    }
    console.log(results);
  })
}


//pool.getConnection(function(err, connection) {
  // execute query
  // ...
//});
