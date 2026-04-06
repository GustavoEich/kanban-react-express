const path = require('path');
const express = require('express');
const app = express();
const authRouter = require('./routes/auth');
const apiRouter = require('./routes/api');
const passport = require('passport');
const pg = require('pg');
const expressSession = require('express-session');
const pgSession = require('connect-pg-simple')(expressSession);
require('dotenv').config();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../client/dist')));  // makes compiled React files available
app.use(express.urlencoded({ extended: false }));


// Passport --------------------------------
const pgPool = new pg.Pool({
  connectionString: process.env.DATABASE_URL 
});
app.use(expressSession({
  store: new pgSession({
    pool : pgPool,                
    tableName : 'user_sessions',
    createTableIfMissing: true,  
  }),
  secret: process.env.FOO_COOKIE_SECRET || 'keyboard cat', 
  resave: false,
  saveUninitialized: false, // Recommended: don't create session until something is stored
  cookie: { maxAge: 10 * 60 * 1000 } // 10 minutes
}));
app.use(passport.authenticate('session'));
// Passport END --------------------------------


app.use('/auth', authRouter); 
app.use('/api', apiRouter);
app.get('{*path}',(req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
});

app.listen(process.env.PORT, () => {
	console.log(`Listening on port ${process.env.PORT}!`);
});