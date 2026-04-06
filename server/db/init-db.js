const pool = require('./db');
const crypto = require('crypto');


async function initDb() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN'); // Start a transaction to mimic .serialize()

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

    await client.query(`
      CREATE TABLE IF NOT EXISTS boards (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        background TEXT, -- Hex code or URL
        position FLOAT NOT NULL
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS lists (
        id SERIAL PRIMARY KEY,
        board_id INTEGER REFERENCES boards(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        position FLOAT NOT NULL
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS notes (
        id SERIAL PRIMARY KEY,
        list_id INTEGER REFERENCES lists(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        content TEXT,
        position FLOAT NOT NULL,
        bg_image TEXT,
        bg_color TEXT
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS tags (
        id SERIAL PRIMARY KEY,
        board_id INTEGER REFERENCES boards(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        color TEXT NOT NULL
      )
    `);

    // Join table for Many-to-Many relationship between Notes and Tags
    await client.query(`
      CREATE TABLE IF NOT EXISTS note_tags (
        note_id INTEGER REFERENCES notes(id) ON DELETE CASCADE,
        tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
        PRIMARY KEY (note_id, tag_id)
      )
    `);




    // Seed User
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

initDb();