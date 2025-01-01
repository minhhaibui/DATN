const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const voucherSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
  discountPercentage: {
    type: Number,
    required: true,
    min: 0,
    max: 8
  },
  expirationDate: {
    type: Date,
    default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  },
  isUsed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
const VoucherModel = mongoose.model('voucher', voucherSchema, 'vouchers');

module.exports = VoucherModel;