const mysql = require('mysql2/promise')

const pool = mysql.createPool({
  connectionLimit: 5,
  user: 'root',
  host: 'localhost',
  database: 'pikkanode'
})

module.exports = pool
