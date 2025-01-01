const VoucherModel = require('../models/voucher.model');

// Tạo mới voucher
exports.createVoucher = async (req, res) => {
  try {
    const { userId, discountPercentage, expirationDate } = req.body;

    // Kiểm tra các trường bắt buộc
    if (!userId || !discountPercentage) {
      return res.status(400).json({ error: 'Missing required fields: userId, discountPercentage' });
    }

    // Mặc định expirationDate là 1 tuần kể từ hiện tại nếu không có
    const defaultExpirationDate = expirationDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const newVoucher = new VoucherModel({
      userId,
      discountPercentage,
      expirationDate: defaultExpirationDate
    });

    const savedVoucher = await newVoucher.save();
    return res.status(201).json({ message: 'Voucher created successfully', data: savedVoucher });
  } catch (error) {
    console.error('Error creating voucher:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Sửa voucher
exports.updateVoucher = async (req, res) => {
  try {
    const {id, discountPercentage, expirationDate, isUsed } = req.body;

    // Kiểm tra ID có tồn tại
    const voucher = await VoucherModel.findById(id);
    if (!voucher) {
      return res.status(404).json({ error: 'Voucher not found' });
    }

    // Cập nhật các trường (nếu có)
    if (discountPercentage !== undefined) voucher.discountPercentage = discountPercentage;
    if (expirationDate !== undefined) voucher.expirationDate = expirationDate;
    if (isUsed !== undefined) voucher.isUsed = isUsed;

    const updatedVoucher = await voucher.save();
    return res.status(200).json({ message: 'Voucher updated successfully', data: updatedVoucher });
  } catch (error) {
    console.error('Error updating voucher:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Xóa voucher
exports.deleteVoucher = async (req, res) => {
  try {
    const { id } = req.body; // Lấy voucher ID từ params

    // Kiểm tra ID có tồn tại
    const voucher = await VoucherModel.findById(id);
    if (!voucher) {
      return res.status(404).json({ error: 'Voucher not found' });
    }

    await VoucherModel.findByIdAndDelete(id);
    return res.status(200).json({ message: 'Voucher deleted successfully' });
  } catch (error) {
    console.error('Error deleting voucher:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


exports.getAllVouchers = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const vouchers = await VoucherModel.find({ userId }).sort({ createdAt: -1 });
    return res.status(200).json({ message: 'Fetched vouchers successfully', data: vouchers });
  } catch (error) {
    console.error('Error fetching vouchers:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};