import React, { useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import warrantyApi from '../../../../apis/warrantyApi';
import helpers from '../../../../helpers';

const columns = [
  {
    title: 'Tên khách hàng',
    dataIndex: 'customerName',
    key: 'customerName',
  },
  {
    title: 'Tên thiết bị',
    dataIndex: 'deviceName',
    key: 'deviceName',
  },
  {
    title: 'Số seri',
    dataIndex: 'serialNumber',
    key: 'serialNumber',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    render: (status) => {
      let color;
      switch (status) {
        case 'Đăng ký thành công':
          color = 'blue';
          break;
        case 'Đã tiếp nhận và bảo hành thành công':
          color = 'green';
          break;
        case 'Hủy đơn bảo hành':
          color = 'volcano';
          break;
        default:
          color = 'default';
      }
      return <Tag color={color}>{status}</Tag>;
    },
  },
  {
    title: 'Ngày bảo hành',
    dataIndex: 'warrantyDate',
    key: 'warrantyDate',
  },
  {
    title: 'Hành động',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Cập nhật</a>
        <a>Xóa</a>
      </Space>
    ),
  },
];

const datas = [
  {
    key: '1',
    customerName: 'Nguyễn Văn A',
    deviceName: 'Máy tính Dell Inspiron',
    serialNumber: 'DELL-12345',
    status: 'Đăng ký thành công',
    warrantyDate: '2024-01-15',
  },
  {
    key: '2',
    customerName: 'Trần Thị B',
    deviceName: 'Máy tính HP Pavilion',
    serialNumber: 'HP-98765',
    status: ' bảo hành thành công',
    warrantyDate: '2023-12-10',
  },
  {
    key: '3',
    customerName: 'Lê Minh C',
    deviceName: 'Máy tính MacBook Pro',
    serialNumber: 'MAC-34567',
    status: 'Hủy đơn bảo hành',
    warrantyDate: '2023-11-05',
  },
  {
    key: '4',
    customerName: 'Phạm Thị D',
    deviceName: 'Máy tính Lenovo ThinkPad',
    serialNumber: 'LEN-56789',
    status: 'Đăng ký thành công',
    warrantyDate: '2024-02-20',
  },
  {
    key: '5',
    customerName: 'Vũ Văn E',
    deviceName: 'Máy tính Acer Aspire',
    serialNumber: 'ACER-24680',
    status: 'Hủy đơn bảo hành',
    warrantyDate: '2024-01-10',
  },
];

const WarrantyList = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataView, setDataView] = useState({});

  useEffect(() => {
    let isSubscribe = true;
    async function getAllWarranties() {
      try {
        setIsLoading(true);
        const response = await warrantyApi.getAllWarranties();
        if (response) {
          setData(response.data.data);
          setIsLoading(false);
        }
      } catch (error) {
        if (isSubscribe) setIsLoading(false);
      }
    }
    getAllWarranties().then();
    return () => {
      isSubscribe = false;
    };
  }, []);
  console.log(data);
  return <Table columns={columns} dataSource={datas} rowKey="key" />;
};

export default WarrantyList;
