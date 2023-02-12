const mysql = require('mysql2');
require("dotenv").config();

// connect to database
const db = mysql.createConnection(
  {
      // mysql information from .env file
      host: '127.0.0.1',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: 3306
  },
 
);



module.exports = db;