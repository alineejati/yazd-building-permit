const RequestModel = require('../models/Request');

// Controller for US1 - ثبت درخواست مالک
const createRequest = (req, res) => {
    const { owner, address, area } = req.body;

    if (!owner || !address || !area) {
        return res.status(400).json({ message: "اطلاعات مالک، آدرس و متراژ لازم است." });
    }

    const newRequest = RequestModel.create(owner, address, area);
    res.status(201).json({ 
        message: "درخواست مالک با موفقیت ثبت شد.",
        request: newRequest
    });
};

// Controller for US2 - مشاهده لیست درخواست ها
const getRequests = (req, res) => {
    const requests = RequestModel.findAll();
    res.status(200).json(requests);
};

// Controller for US3 - بررسی کارشناس و تغییر وضعیت
const updateRequestStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({ message: "وضعیت جدید (status) الزامی است." });
    }
    
    // Attempt to update the status in the model
    const updatedRequest = RequestModel.updateStatus(id, status);

    if (!updatedRequest) {
        return res.status(404).json({ message: "درخواست با این شناسه یافت نشد." });
    }

    res.status(200).json({
        message: `وضعیت درخواست #${id} به '${status}' تغییر یافت.`,
        request: updatedRequest
    });
};
// Controller for US4 - مشاهده جزئیات درخواست
const getRequestDetails = (req, res) => {
    const { id } = req.params;

    const request = RequestModel.findById(id);

    if (!request) {
        return res.status(404).json({ message: "درخواست با این شناسه یافت نشد." });
    }

    res.status(200).json(request);
};
// Controller for US5 - لغو درخواست توسط مالک
const deleteRequest = (req, res) => {
    const { id } = req.params;

    const result = RequestModel.cancelRequest(id);

    if (!result.success) {
        // Handle Request Not Found (404) or Status Conflict (409)
        if (result.message.includes("یافت نشد")) {
            return res.status(404).json({ message: result.message });
        }
        // Conflict error for invalid status
        return res.status(409).json({ message: result.message });
    }

    res.status(200).json({
        message: `درخواست #${id} با موفقیت لغو شد.`,
        request: result.request
    });
};
// Controller for Fake Payment
const fakePayment = (req, res) => {
    const { id } = req.params;

    const result = RequestModel.markAsPaid(id);

    if (!result.success) {
        return res.status(400).json({ message: result.message });
    }

    res.status(200).json({
        message: `پرداخت عوارض درخواست #${id} با موفقیت شبیه‌سازی و وضعیت به 'پرداخت شده' تغییر یافت.`,
        request: result.request
    });
};
// Controller for Final US: Issue Final Permit
const issueFinalPermit = (req, res) => {
    const { id } = req.params;

    const result = RequestModel.issuePermit(id);

    if (!result.success) {
        // Handle Request Not Found (404) or Status Conflict (409)
        if (result.message.includes("یافت نشد")) {
            return res.status(404).json({ message: result.message });
        }
        // Conflict error for invalid status
        return res.status(409).json({ message: result.message });
    }

    res.status(200).json({
        message: `جواز درخواست #${id} با موفقیت صادر شد.`,
        request: result.request
    });
};
module.exports = { createRequest, getRequests, updateRequestStatus, getRequestDetails, deleteRequest, fakePayment, issueFinalPermit };
