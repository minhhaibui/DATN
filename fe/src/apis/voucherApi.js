import axiosClient from './axiosClient';

const VOUCHER_API_ENDPOINT = '/vouchers';

const voucherApi = {
  // Lấy danh sách voucher của người dùng
  getVouchersByUserId: (userId) => {
    const url = `${VOUCHER_API_ENDPOINT}/list`;
    return axiosClient.post(url, { userId });
  },
};

export default voucherApi;
