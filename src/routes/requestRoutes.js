const express = require('express');
const router = express.Router();
const { createRequest, getRequests, updateRequestStatus, getRequestDetails, deleteRequest } = require('../controllers/RequestController');

// Route for US1 (POST /api/requests)
router.post('/requests', createRequest);

// Route for US2 (GET /api/requests)
router.get('/requests', getRequests);
// Route for US4 (GET /api/requests/:id) - مشاهده جزئیات درخواست
router.get('/requests/:id', getRequestDetails);
// Route for US3 (PATCH /api/requests/:id) - تغییر وضعیت درخواست
router.patch('/requests/:id', updateRequestStatus);
// Route for US5 (DELETE /api/requests/:id) - لغو درخواست
router.delete('/requests/:id', deleteRequest);
module.exports = router;
