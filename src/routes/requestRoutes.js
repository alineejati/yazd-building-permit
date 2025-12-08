const express = require('express');
const router = express.Router();
const { createRequest, getRequests, updateRequestStatus } = require('../controllers/RequestController');

// Route for US1 (POST /api/requests)
router.post('/requests', createRequest);

// Route for US2 (GET /api/requests)
router.get('/requests', getRequests);
// Route for US3 (PATCH /api/requests/:id) - تغییر وضعیت درخواست
router.patch('/requests/:id', updateRequestStatus);
module.exports = router;
