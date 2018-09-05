const mysql = require('mysql2/promise')

const pool = mysql.createPool({
  connectionLimit: 5,
  user: 'root',
  password: 'admin1',
  host: 'localhost',
  database: 'pikkanode'
})

module.exports = pool
