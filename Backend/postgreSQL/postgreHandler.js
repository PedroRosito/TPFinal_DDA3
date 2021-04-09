const { PayloadTooLarge } = require('http-errors');
const { Pool } = require('pg');
var format = require('pg-format');
 
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'testdb',
  password: '1234abcd',
  port: 5432,
});

pool.on('error', (err, client) => {
  console.error('Error:', err);
});




module.exports = pool;
