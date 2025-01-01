import React, { useState } from 'react';
import { Select, Button, Typography, message } from 'antd';
import voucherApi from '../../apis/voucherApi';

const { Title } = Typography;
const { Option } = Select;

const VoucherList = ({ userId, selectedVoucher, setSelectedVoucher }) => {
  const [vouchers, setVouchers] = useState([]); // Voucher đã chọn
  const [loading, setLoading] = useState(false); // Trạng thái tải dữ liệu
  const [showVouchers, setShowVouchers] = useState(false); // Hiển thị danh sách voucher

  // Fetch vouchers theo userId
  const fetchVouchers = async () => {
    if (!userId) {
      message.error('User ID is required!');
      return;
    }

    setLoading(true);
    try {
      const response = await voucherApi.getVouchersByUserId(userId); // Gọi API để lấy danh sách voucher
      setVouchers(response.data.data);
      setShowVouchers(true); // Hiển thị danh sách voucher
    } catch (error) {
      console.error('Error fetching vouchers:', error);
      message.error('Failed to fetch vouchers.');
    } finally {
      setLoading(false);
    }
  };
  // Xử lý chọn voucher
  const handleSelectVoucher = (voucherId) => {
    const voucher = vouchers.find((v) => v._id === voucherId);

    if (!voucher) {
      message.error('Voucher not found!');
      return;
    }

    if (new Date(voucher.expirationDate) < new Date()) {
      message.error('This voucher has expired!');
      return;
    }

    setSelectedVoucher(voucher); // Lưu voucher đã chọn vào state
    message.success(`Selected voucher: ${voucher.discountPercentage}% off`);
  };

  // Kiểm tra xem voucher đã hết hạn hay chưa
  const isExpired = (expirationDate) => new Date(expirationDate) < new Date();

  return (
    <div>
      <Button
        type="primary"
        onClick={fetchVouchers}
        disabled={loading || showVouchers} // Chỉ cho phép bấm nếu chưa load xong hoặc chưa hiện danh sách
      >
        Add Voucher
      </Button>
      {showVouchers && (
        <div style={{ marginTop: '20px' }}>
          {loading ? (
            <p>Loading vouchers...</p>
          ) : (
            <div>
              <Select
                style={{ width: '100%' }}
                placeholder="Select a voucher"
                onChange={handleSelectVoucher}
                value={selectedVoucher?._id || null}>
                {vouchers.map((voucher) => (
                  <Option
                    key={voucher._id}
                    value={voucher._id}
                    disabled={
                      isExpired(voucher.expirationDate) || voucher.isUsed
                    } // Vô hiệu hóa nếu voucher đã hết hạn
                  >
                    Giảm giá {voucher.discountPercentage}% -{' '}
                    {voucher.isUsed
                      ? 'Đã sử dụng'
                      : isExpired(voucher.expirationDate)
                      ? `Hết hạn ${new Date(
                          voucher.expirationDate,
                        ).toLocaleDateString()}`
                      : `Hết hạn ${new Date(
                          voucher.expirationDate,
                        ).toLocaleDateString()}`}
                  </Option>
                ))}
              </Select>
              {selectedVoucher && (
                <div style={{ marginTop: '20px' }}>
                  <Title level={5}>Voucher đã chọn:</Title>
                  <p>
                    <strong>Giảm giá:</strong>{' '}
                    {selectedVoucher.discountPercentage}% <br />
                    <strong>Hết hạn:</strong>{' '}
                    {new Date(
                      selectedVoucher.expirationDate,
                    ).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VoucherList;
