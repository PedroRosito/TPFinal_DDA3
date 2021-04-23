const { PayloadTooLarge } = require('http-errors');
const { Pool } = require('pg');
var format = require('pg-format');
 
const pool = new Pool({
  user: 'YOUR_USER',
  host: 'localhost',
  database: 'YOUR_DATABASE_NAME',
  password: 'YOUR_PASSWORD',
  port: 5432,
});

pool.on('error', (err, client) => {
  console.error('Error:', err);
});




module.exports = pool;
