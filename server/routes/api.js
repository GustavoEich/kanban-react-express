const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/auth.js');


router.get('/me', checkAuth, (req, res) => {
  res.json({
    id: req.user.id,
    username: req.user.username
  });
});


module.exports = router;