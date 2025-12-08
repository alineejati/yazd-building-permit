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

module.exports = { create, findAll };
