const voucherApi = require('express').Router();
const voucherController = require('../controllers/voucher.controller');

// API: Lấy danh sách voucher
voucherApi.post('/list', voucherController.getAllVouchers);

// API: Lấy chi tiết 1 voucher

// API: Tạo 1 voucher mới
voucherApi.post('/', voucherController.createVoucher);
voucherApi.put('/', voucherController.updateVoucher);

// API: Xóa 1 voucher
voucherApi.delete('/', voucherController.deleteVoucher);

module.exports = voucherApi;