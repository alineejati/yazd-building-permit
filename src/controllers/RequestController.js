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

module.exports = { createRequest, getRequests };
