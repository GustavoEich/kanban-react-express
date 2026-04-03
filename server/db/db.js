const { Pool } = require('pg');
const crypto = require('crypto');
require('dotenv').config();

// Create a pool using your .env connection string
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function initDb() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN'); // Start a transaction to mimic .serialize()

    // 1. Users Table (Note: SERIAL instead of INTEGER PRIMARY KEY)
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        hashed_password BYTEA NOT NULL,
        salt BYTEA NOT NULL,
        name TEXT,
        email TEXT UNIQUE,
        email_verified BOOLEAN DEFAULT FALSE
      )
    `);

    // 2. Federated Credentials
    await client.query(`
      CREATE TABLE IF NOT EXISTS federated_credentials (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id),
        provider TEXT NOT NULL,
        subject TEXT NOT NULL,
        UNIQUE (provider, subject)
      )
    `);


    // 3. Seed User
    const salt = crypto.randomBytes(16);
    const hash = crypto.pbkdf2Sync('letmein', salt, 310000, 32, 'sha256');
    
    await client.query(
      `INSERT INTO users (username, hashed_password, salt) 
       VALUES ($1, $2, $3) 
       ON CONFLICT (username) DO NOTHING`,
      ['alice', hash, salt]
    );

    await client.query('COMMIT');
    console.log("Database initialized successfully.");
  } catch (err) {
    await client.query('ROLLBACK');
    console.error("Database initialization failed:", err);
  } finally {
    client.release();
  }
}

// Run the initialization
initDb();

// Export the pool so other files can use it
module.exports = pool;