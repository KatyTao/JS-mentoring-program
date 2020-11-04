let mysql = require('mysql2');
require('dotenv').config()

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
}

module.exports = mysql.createConnection(config);
