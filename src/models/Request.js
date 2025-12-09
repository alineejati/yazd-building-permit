const requests = [];
let nextId = 1;

// Method for US1: Create a new request
const create = (owner, address, area) => {
    const newRequest = {
        id: nextId++,
        owner,
        address,
        area,
        status: "ثبت اولیه",
        createdAt: new Date().toISOString()
    };
    requests.push(newRequest);
    return newRequest;
};

// Method for US2: Get all requests
const findAll = () => {
    return requests;
};

// New method for US3: Update request status
const updateStatus = (id, newStatus) => {
    const request = requests.find(r => r.id === parseInt(id));
    if (request) {
        request.status = newStatus;
        return request;
    }
    return null; // Return null if request not found
};
// New method for US4: Find a request by ID
const findById = (id) => {
    return requests.find(r => r.id === parseInt(id));
};
// New method for US5: Cancel a request
const cancelRequest = (id) => {
    const request = requests.find(r => r.id === parseInt(id));

    if (!request) {
        return { success: false, message: "درخواست یافت نشد." };
    }

    // US5 Acceptance Criteria: Only requests with status 'ثبت اولیه' can be cancelled
    if (request.status !== "ثبت اولیه") {
        return { success: false, message: `فقط درخواست‌هایی با وضعیت 'ثبت اولیه' قابل لغو هستند. وضعیت فعلی: ${request.status}` };
    }

    // Change status to 'لغو شده'
    request.status = "لغو شده";
    return { success: true, request };
};
// New method for Fake Payment
const markAsPaid = (id) => {
    const request = requests.find(r => r.id === parseInt(id));

    if (!request) {
        return { success: false, message: "درخواست یافت نشد." };
    }
    
    // Check if the request is not already canceled
    if (request.status === "لغو شده") {
        return { success: false, message: "این درخواست قبلاً لغو شده است." };
    }
    
    // Change status to 'پرداخت شده'
    request.status = "پرداخت شده";
    return { success: true, request };
};
module.exports = { create, findAll, updateStatus, findById, cancelRequest, markAsPaid };
