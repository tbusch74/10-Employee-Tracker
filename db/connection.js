const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'bootcamp',
    password: 'bootcamp',
    database: 'employee_tracker'
  });

module.exports = db;