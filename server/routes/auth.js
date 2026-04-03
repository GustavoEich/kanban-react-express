var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');
var db = require('../db/db.js');

var router = express.Router();

passport.use(new LocalStrategy(function verify(username, password, cb) {
  db.query(
    'SELECT * FROM users WHERE username = $1',
    [username],
    function (err, result) {
      if (err) return cb(err);

      const row = result.rows[0];

      if (!row) {
        return cb(null, false, { message: 'Incorrect username or password.' });
      }

      crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function (err, hashedPassword) {
        if (err) return cb(err);

        if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
          return cb(null, false, { message: 'Incorrect username or password.' });
        }

        return cb(null, row);
      });
    }
  );
}));

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      console.log("Login Failed Reason:", info.message); // This will tell you if it's "Incorrect username..."
      return res.status(401).json({ message: "Invalid credentials" });
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json({ success: true, user: req.user });
    });
  })(req, res, next);
});

router.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

router.post('/signup', function(req, res, next) {
  var salt = crypto.randomBytes(16);
  crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', function(err, hashedPassword) {
    if (err) { return next(err); }

    db.query('INSERT INTO users (username, hashed_password, salt) VALUES ($1, $2, $3) RETURNING id', [
      req.body.username,
      hashedPassword,
      salt
    ], function(err, result) {
      if (err) { return next(err); }

      var user = {
        id: result.rows.id, // Access the returned ID from the result rows
        username: req.body.username
      };

      req.login(user, function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
    });
  });
});

module.exports = router;