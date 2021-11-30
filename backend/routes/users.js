const express = require('express');
const router = express.Router();

// Require controller modules
var user_controller = require('../controllers/userController');

/// USER ROUTES ///

// GET request for authentication
router.get('/auth', user_controller.auth);

// POST request for registration
router.post('/register', user_controller.register);

// POST request for login
router.post('/login', user_controller.login);

// GET request for graphs associated with a certain user
router.get('/:id/graphs', user_controller.user_graphs)

module.exports = router;
