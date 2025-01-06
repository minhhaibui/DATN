import React, { useEffect, useState } from 'react';
import { Button, Modal, Radio, Space, Table, Tag } from 'antd';
import warrantyApi from '../../../../apis/warrantyApi';
import helpers from '../../../../helpers';

const datas = [
  {
    key: '1',
    id: '09873',
    customerName: 'Nguyễn Văn Hai',
    deviceName: 'Máy tính Dell Inspiron',
    serialNumber: 'DELL-12345',
    status: 'Đăng ký thành công',
    warrantyDate: '2024-01-15',
  },
  {
    key: '2',
    id: '04673',
    customerName: 'Trần Thị Linh',
    deviceName: 'Máy tính HP Pavilion',
    serialNumber: 'HP-98765',
    status: ' bảo hành thành công',
    warrantyDate: '2023-12-10',
  },
  {
    key: '3',
    id: '09653',
    customerName: 'Lê Minh khôi',
    deviceName: 'Máy tính MacBook Pro',
    serialNumber: 'MAC-34567',
    status: 'Hủy đơn bảo hành',
    warrantyDate: '2023-11-05',
  },
  {
    key: '4',
    id: '09453',
    customerName: 'Phạm Thị Dung',
    deviceName: 'Máy tính Lenovo ThinkPad',
    serialNumber: 'LEN-56789',
    status: 'Đăng ký thành công',
    warrantyDate: '2024-02-20',
  },
  {
    key: '5',
    id: '09874',
    customerName: 'Vũ Văn Vinh',
    deviceName: 'Máy tính Acer Aspire',
    serialNumber: 'ACER-24680',
    status: 'Hủy đơn bảo hành',
    warrantyDate: '2024-01-10',
  },
];
function generateWarrantyFilter() {
  let result = [];
  for (let i = 0; i < 4; ++i) {
    result.push({ value: i, text: helpers.convertWarrantyStatus(i) });
  }
  return result;
}

const WarrantyList = () => {
  const columns = [
    {
      title: 'Mã phiếu bảo hành',
      dataIndex: 'id',
      key: 'id',
      render: (id) => (
        <a
          style={{ color: 'blue' }} // Màu chữ xanh
        >
          {id}
        </a>
      ),
    },
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
          {/* Nút Cập nhật (màu xanh) */}
          <Button type="dashed" onClick={() => UpdateWarrantyStatusModal()}>
            Cập nhật
          </Button>

          {/* Nút Xóa (màu đỏ) */}
          <Button danger>Xóa</Button>
        </Space>
      ),
    },
  ];

  function UpdateWarrantyStatusModal(
    defaultVal = 0,
    warrantyCode = '09873',
    warrantyId,
    productId,
    isWarrantyValid,
  ) {
    let valueCurr = defaultVal;
    const modal = Modal.info({
      width: 768,
      title: `Cập nhật trạng thái phiếu bảo hành #${warrantyCode}`,
      content: (
        <Radio.Group
          defaultValue={defaultVal}
          onChange={(v) => (valueCurr = v.target.value)}
          className="m-t-12">
          {generateWarrantyFilter().map((item, index) => (
            <Radio
              className="m-b-8"
              key={index}
              value={item.value}
              disabled={!isWarrantyValid && index >= 2} // Vô hiệu hóa một số trạng thái nếu bảo hành không hợp lệ
            >
              {item.text}
            </Radio>
          ))}
        </Radio.Group>
      ),
      centered: true,
      icon: null,
      okText: 'Cập nhật',
      onOk: () => {
        // updateWarrantyStatus(warrantyId, valueCurr, productId);
        modal.destroy();
      },
    });
  }

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
