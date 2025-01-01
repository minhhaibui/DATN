const warrantyApi = require('express').Router();
const warrantyController = require('../controllers/warranty.controller');

// API: Lấy danh sách tất cả phiếu bảo hành
warrantyApi.get('/list', warrantyController.getAllWarranties);

// API: Lấy chi tiết 1 phiếu bảo hành
// warrantyApi.get('/:id', warrantyController.getWarrantyById);

// API: Tạo 1 phiếu bảo hành mới
warrantyApi.post('/', warrantyController.createWarranty);

// API: Cập nhật 1 phiếu bảo hành
warrantyApi.put('/:id', warrantyController.updateWarranty);

// API: Xóa 1 phiếu bảo hành
warrantyApi.delete('/:id', warrantyController.deleteWarranty);

module.exports = warrantyApi;
