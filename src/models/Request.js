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
module.exports = { create, findAll, updateStatus, findById };
