import axiosClient from './axiosClient';

const WARRANTY_API_ENDPOINT = '/warranty';

const warrantyApi = {
  // Lấy danh sách tất cả phiếu bảo hành
  getAllWarranties: () => {
    const url = `${WARRANTY_API_ENDPOINT}/list`;
    return axiosClient.get(url);
  },

  // Lấy chi tiết một phiếu bảo hành
  getWarrantyById: (id) => {
    const url = `${WARRANTY_API_ENDPOINT}/${id}`;
    return axiosClient.get(url);
  },

  // Tạo mới một phiếu bảo hành
  createWarranty: (data) => {
    const url = WARRANTY_API_ENDPOINT;
    return axiosClient.post(url, data);
  },

  // Cập nhật một phiếu bảo hành
  updateWarranty: (id, data) => {
    const url = `${WARRANTY_API_ENDPOINT}/${id}`;
    return axiosClient.put(url, data);
  },

  // Xóa một phiếu bảo hành
  deleteWarranty: (id) => {
    const url = `${WARRANTY_API_ENDPOINT}/${id}`;
    return axiosClient.delete(url);
  },
};

export default warrantyApi;
