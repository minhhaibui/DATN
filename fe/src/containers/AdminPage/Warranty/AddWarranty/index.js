import React, { useState } from 'react';
import {
  Input,
  Button,
  Card,
  Form,
  Space,
  message,
  Row,
  Col,
  Typography,
  Table,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const AddWarranty = () => {
  const [serialNumber, setSerialNumber] = useState('');
  const [warrantyInfo, setWarrantyInfo] = useState(null);
  const [repairDetails, setRepairDetails] = useState({
    description: '',
    technician: '',
  });
  const [isSearching, setIsSearching] = useState(false);

  const warrantyData = [
    {
      serialNumber: 'ABC123',
      customerName: 'Nguyễn Văn Linh',
      customerPhone: '0901234567',
      customerAddress: 'Số 12, Đường Lý Thường Kiệt, Hà Nội',
      purchaseDate: '2024-01-01',
      warrantyEndDate: '2025-01-01', // Ngày hết hạn bảo hành
      productName: 'Điện thoại Samsung Galaxy S21',
      color: 'Đen',
      price: 20000000,
      discount: 0.1,
      voucher: 500000,
    },
    {
      serialNumber: 'XYZ456',
      customerName: 'Trần Thị Huệ',
      customerPhone: '0912345678',
      customerAddress: 'Số 23, Đường Nguyễn Trãi, TP.HCM',
      purchaseDate: '2023-12-25',
      warrantyEndDate: '2024-12-25', // Ngày hết hạn bảo hành
      productName: 'Laptop Dell XPS 13',
      color: 'Xám',
      price: 30000000,
      discount: 0.05,
      voucher: 1000000,
    },
  ];

  const handleSearchSerial = () => {
    const found = warrantyData.find(
      (item) => item.serialNumber === serialNumber,
    );

    if (found) {
      setWarrantyInfo(found);
      setIsSearching(true);
    } else {
      setWarrantyInfo(null);
      message.error('Số seri không tồn tại!');
    }
  };

  const handleCancelSearch = () => {
    setSerialNumber('');
    setWarrantyInfo(null);
    setIsSearching(false);
  };

  const handleSubmit = () => {
    if (!warrantyInfo) {
      message.error('Vui lòng nhập số seri hợp lệ!');
      return;
    }

    console.log('Thông tin bảo hành:', {
      ...warrantyInfo,
      repairDetails,
    });

    message.success('Thêm phiếu bảo hành thành công!');
  };

  const columns = [
    {
      title: 'Số Seri',
      dataIndex: 'serialNumber',
      key: 'serialNumber',
    },
    {
      title: 'Tên Sản Phẩm',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Ngày Mua',
      dataIndex: 'purchaseDate',
      key: 'purchaseDate',
      render: (text) => <Text>{text}</Text>, // Định dạng ngày nếu cần
    },
    {
      title: 'Ngày Hết Hạn Bảo Hành',
      dataIndex: 'warrantyEndDate',
      key: 'warrantyEndDate',
      render: (text) => <Text>{text || 'Chưa xác định'}</Text>, // Xử lý trường hợp không có giá trị
    },
    {
      title: 'Giảm Giá',
      dataIndex: 'discount',
      key: 'discount',
      render: (text) => `${(text * 100).toFixed(2)}%`,
    },
    {
      title: 'Voucher',
      dataIndex: 'voucher',
      key: 'voucher',
      render: (text) => `${text.toLocaleString()} VND`,
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (text) => `${text.toLocaleString()} VND`,
    },
    {
      title: 'Thành Tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (_, record) => {
        const discountAmount = record.price * record.discount;
        const finalPrice = record.price - discountAmount - record.voucher;
        return `${finalPrice.toLocaleString()} VND`;
      },
    },
  ];

  return (
    <div style={{ padding: '20px', margin: '0 auto' }}>
      <Card title="Thêm Phiếu Bảo Hành" bordered={false}>
        {!isSearching ? (
          <Space style={{ width: '100%' }} direction="vertical">
            <Input
              placeholder="Nhập số seri sản phẩm"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              style={{ width: '60%' }}
              prefix={<SearchOutlined />}
            />
            <Button
              onClick={handleSearchSerial}
              type="primary"
              icon={<SearchOutlined />}>
              Tìm Kiếm
            </Button>
          </Space>
        ) : (
          <div style={{ marginTop: '20px' }}>
            <Row>
              <Col span={24}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Card
                      style={{
                        backgroundColor: '#f0f2f5',
                        height: '100%',
                      }}
                      title="Thông Tin Khách Hàng"
                      bordered={false}>
                      <p>
                        <strong>Tên khách hàng:</strong>{' '}
                        {warrantyInfo.customerName}
                      </p>
                      <p>
                        <strong>Số điện thoại:</strong>{' '}
                        {warrantyInfo.customerPhone}
                      </p>
                      <p>
                        <strong>Địa chỉ:</strong> {warrantyInfo.customerAddress}
                      </p>
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card
                      style={{
                        backgroundColor: '#f0f2f5',
                        height: '100%',
                      }}
                      title="Hình Thức Thanh Toán"
                      bordered={false}>
                      <p>
                        <strong>Thanh Toán Online</strong>
                      </p>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Table
              columns={columns}
              dataSource={[warrantyInfo]}
              pagination={false}
              rowKey="serialNumber"
              style={{ marginTop: '20px' }}
            />
            <Form
              style={{ marginTop: '20px' }}
              layout="vertical"
              onFinish={handleSubmit}>
              <Form.Item label="Lý Do Bảo Hành" required>
                <Input.TextArea
                  value={repairDetails.description}
                  onChange={(e) =>
                    setRepairDetails({
                      ...repairDetails,
                      description: e.target.value,
                    })
                  }
                  rows={4}
                />
              </Form.Item>
              <Form.Item label="Kỹ Thuật Viên Sửa Chữa" required>
                <Input
                  value={repairDetails.technician}
                  onChange={(e) =>
                    setRepairDetails({
                      ...repairDetails,
                      technician: e.target.value,
                    })
                  }
                />
              </Form.Item>
              <Form.Item>
                <Space style={{ width: '100%', marginTop: '10px' }}>
                  <Button type="primary" htmlType="submit">
                    Lưu Phiếu Bảo Hành
                  </Button>
                  <Button type="primary" danger onClick={handleCancelSearch}>
                    Hủy Bỏ
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AddWarranty;
