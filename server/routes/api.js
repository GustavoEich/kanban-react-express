const express = require('express');
const router = express.Router();

router.get('/me', function(req, res) {
  if (req.isAuthenticated()) {
    // Respond with the user information stored in the session
    res.json({
      id: req.user.id,
      username: req.user.username
    });
  } else {
    res.status(401).json(null);
  }
});

module.exports = router;