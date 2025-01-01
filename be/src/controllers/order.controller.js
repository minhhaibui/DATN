const OrderModel = require('../models/order.model');
const VoucherModel = require('../models/voucher.model');
const helpers = require('../helpers');
const ProductModel = require('../models/product.models/product.model');

// api: lấy danh sách đơn hàng
const getOrderList = async (req, res, next) => {
  try {
    const { userId } = req.query;
    const orderList = await OrderModel.find({ owner: userId }).select(
      '-owner -deliveryAdd -paymentMethod -note',
    );
    if (orderList) {
      return res.status(200).json({ list: orderList });
    }
    return res.status(200).json({ list: [] });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ list: [] });
  }
};

// api: lấy chi tiết 1 đơn hàng
const getOrderDetails = async (req, res, next) => {
  try {
    const { orderId } = req.query;
    const order = await OrderModel.findById(orderId).select('-_id -owner');
    if (order) {
      const { deliveryAdd ,serialNumbers} = order;
      const { name, phone, address } = deliveryAdd;
      const addressStr = await helpers.convertAddress(address);
      let newOrder = {
        ...order._doc,
        deliveryAdd: { name, phone, address: addressStr },
        serialNumbers
      };
      return res.status(200).json({ order: newOrder });
    }
    return res.status(400).json({});
  } catch (error) {
    console.error(error);
    return res.status(400).json({});
  }
};
const generateSerialNumber = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const randomLetters = [...Array(2)].map(() => letters.charAt(Math.floor(Math.random() * letters.length))).join('');
  const timestamp = Date.now();
  const lastSixDigits = timestamp.toString().slice(-6);
  return `${randomLetters}${lastSixDigits}`;
};
// api: tạo 1 đơn hàng (tách nhiều sản phẩm ra mỗi sp 1 đơn)
const postCreateOrder = async (req, res, next) => {
  try {
    const data = req.body;
    const {
      owner,
      deliveryAdd,
      paymentMethod,
      orderStatus,
      transportMethod,
      transportFee,
      orderDate,
      productList,
      note,
      voucher
    } = data;

    let response = {};
    for (let i = 0; i < productList.length; ++i) {
      const { orderProd, numOfProd } = productList[i];
      const product = await ProductModel.findById(orderProd.id);
      if (product) {
        if (product.stock < parseInt(numOfProd)) {
          return res.status(401).json({ message: 'Sản phẩm tồn kho đã hết' });
        } else {
          const orderCode = helpers.generateVerifyCode(6);
          await ProductModel.updateOne(
            { _id: orderProd.id },
            { stock: product.stock - parseInt(numOfProd) },
          );
          response = await OrderModel.create({
            owner,
            orderCode,
            deliveryAdd,
            paymentMethod,
            orderStatus,
            transportMethod,
            transportFee,
            orderDate,
            orderProd,
            numOfProd,
            note,
            vouchersDetails :{
              id:voucher._id,
              discountPercentage: voucher.discountPercentage
            }
          });
        }
      } else {
        return res.status(401).json({ message: 'Sản phẩm đẫ ngừng bán' });
      }
    }
    if (response){
      await createRandomVoucher(owner)
      if(voucher){
       await updateVoucherStatus(voucher._id, true);
      }
      return res.status(200).json({});
    }

      return res.status(200).json({});
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Lỗi hệ thống' });
  }
};
async function createRandomVoucher(userId) {
  try {
    // Tạo một phần trăm giảm giá ngẫu nhiên từ 3 đến 7
    const discountPercentage = Math.floor(Math.random() * (7 - 3 + 1)) + 3;

    // Tạo một đối tượng voucher mới
    const newVoucher = new VoucherModel({
      userId: userId,
      discountPercentage: discountPercentage,
      expirationDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 ngày từ thời điểm tạo
    });

    // Lưu voucher vào database
    await newVoucher.save();

    console.log('Voucher created:', newVoucher);
    return newVoucher;
  } catch (error) {
    console.error('Error creating voucher:', error);
    throw error;
  }
}

const updateVoucherStatus = async (voucherId, isUsed) => {
  try {
    if (!voucherId || typeof isUsed !== 'boolean') {
      throw new Error('Invalid voucherId or isUsed status');
    }

    const updatedVoucher = await VoucherModel.findByIdAndUpdate(
      voucherId,
      { isUsed },
      { new: true } // Tùy chọn này trả về tài liệu đã cập nhật
    );

    // Nếu không tìm thấy voucher
    if (!updatedVoucher) {
      throw new Error('Voucher not found');
    }

    console.log('Voucher updated:', updatedVoucher);
    return updatedVoucher;
  } catch (error) {
    console.error('Error updating voucher status:', error);
    throw error;
  }
};

const postCreateOrderSignature = async (req, res, next) => {
  var querystring = require('qs');
  let  secretKey= 'RYETZDZSVUBWRJZQIKVDQJGNDEOLJCKA';
  var signData = req.body.vnpParams;
  var crypto = require("crypto");
  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(signData, 'utf-8').digest("hex");
  return res.status(200).json({ signed: signed});
};

module.exports = {
  getOrderList,
  getOrderDetails,
  postCreateOrder,
  postCreateOrderSignature,
};
