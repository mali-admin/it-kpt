const express = require('express');
const router = express.Router();
const { createLog ,getLogs } = require('../controllers/logController');

router.post('/log', createLog);
router.get('/log', getLogs);

module.exports = router;