const mysql = require('mysql2')
const dotenv = require('dotenv')
dotenv.config()

const pool = mysql.pool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    database:process.env.DB_NAME
})

 

module.exports = pool.promise()