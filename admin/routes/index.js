const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/device');
const firmwareController = require('../controllers/firmware');
const dashboardController = require('../controllers/dashboard');
const userController = require('../controllers/user');
// Routes
router.get('/', dashboardController.view);
router.get('/devices', deviceController.view);
router.get('/firmware', firmwareController.view);
router.get('/users', userController.view);
router.get('/measurements', userController.view);

module.exports = router;