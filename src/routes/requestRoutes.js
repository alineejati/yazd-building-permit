const express = require('express');
const router = express.Router();
const { createRequest, getRequests } = require('../controllers/RequestController');

// Route for US1 (POST /api/requests)
router.post('/requests', createRequest);

// Route for US2 (GET /api/requests)
router.get('/requests', getRequests);

module.exports = router;
