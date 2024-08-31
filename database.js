const { createPool } = require('@vercel/postgres');

require('dotenv').config()

const pool = createPool({
  connectionString: process.env.POSTGRES_URL,
})

pool.connect((err) => {
    if (err) throw err
    console.log("Connect to PostgreSQL successfully!")
})

module.exports = pool