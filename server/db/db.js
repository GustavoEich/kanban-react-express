const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Create a pool using your .env connection string
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});


// Export the pool so other files can use it
module.exports = pool;