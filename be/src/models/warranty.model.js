const mongoose = require('mongoose');
const { Schema } = mongoose;

const warrantySchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
  order_id: { type: Schema.Types.ObjectId, required: true, ref: 'order' },
  product_data: {
    type: Object,
    required: true
  }, // Lưu thông tin sản phẩm
  warranty_date: {
    type: String,
    required: true,
  }, // Ngày bảo hành

  // trạng thái đơn bảo hanh
  // 0 - đăng ký thành công, 1 - STORE đã tiếp nhận, 2 - bảo hành thành cong  3- huy phieu bao hanh

  warranty_status: {
    type: Number,
    enum: [...Array(4).keys()],
    required: true,
    default: 0,
  },
  description: {
    type: String,
    default: ''
  } // Ghi chú thêm
});

const WarrantyModel = mongoose.model('Warranty', warrantySchema);
module.exports = WarrantyModel;
