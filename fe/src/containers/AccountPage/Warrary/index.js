import React, { useState } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  message,
} from 'antd';
import moment from 'moment';

const { Option } = Select;

const WarrantyList = () => {
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      customerName: 'Nguyễn Văn A',
      product: 'Điện thoại Samsung Galaxy S21',
      serialNumber: 'S21-12345',
      status: 'Đang hiệu lực',
      warrantyDate: '2024-01-15',
    },
    {
      key: '2',
      customerName: 'Trần Thị B',
      product: 'Laptop Dell Inspiron 15',
      serialNumber: 'DELL-98765',
      status: 'Hết hạn',
      warrantyDate: '2022-11-30',
    },
    {
      key: '3',
      customerName: 'Lê Minh C',
      product: 'Máy giặt LG SmartWash',
      serialNumber: 'LG-24567',
      status: 'Đang hiệu lực',
      warrantyDate: '2023-12-10',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRow, setEditingRow] = useState(null);

  const handleCreate = () => {
    setEditingRow(null);
    setIsModalOpen(true);
  };

  const handleEdit = (record) => {
    setEditingRow(record);
    setIsModalOpen(true);
  };

  const handleDelete = (key) => {
    setDataSource((prev) => prev.filter((item) => item.key !== key));
    message.success('Xóa thành công!');
  };

  const handleSubmit = (values) => {
    const formattedValues = {
      ...values,
      warrantyDate: values.warrantyDate.format('YYYY-MM-DD'),
      key: editingRow ? editingRow.key : Date.now().toString(),
    };

    if (editingRow) {
      setDataSource((prev) =>
        prev.map((item) =>
          item.key === editingRow.key ? formattedValues : item,
        ),
      );
      message.success('Cập nhật thành công!');
    } else {
      setDataSource((prev) => [...prev, formattedValues]);
      message.success('Thêm mới thành công!');
    }
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: 'Tên khách hàng',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Thông tin sản phẩm',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Số seri sản phẩm',
      dataIndex: 'serialNumber',
      key: 'serialNumber',
    },
    {
      title: 'Trạng thái phiếu bảo hành',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Ngày bảo hành',
      dataIndex: 'warrantyDate',
      key: 'warrantyDate',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>
            Cập nhật
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.key)}>
            Xóa
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        onClick={handleCreate}
        style={{ marginBottom: 16 }}>
        Tạo phiếu bảo hành
      </Button>
      <Table dataSource={dataSource} columns={columns} rowKey="key" />
      <Modal
        title={editingRow ? 'Cập nhật phiếu bảo hành' : 'Tạo phiếu bảo hành'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}>
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={
            editingRow
              ? {
                  ...editingRow,
                  warrantyDate: moment(editingRow.warrantyDate, 'YYYY-MM-DD'),
                }
              : {}
          }>
          <Form.Item
            name="customerName"
            label="Tên khách hàng"
            rules={[
              { required: true, message: 'Vui lòng nhập tên khách hàng!' },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="product"
            label="Thông tin sản phẩm"
            rules={[
              { required: true, message: 'Vui lòng nhập thông tin sản phẩm!' },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="serialNumber"
            label="Số seri sản phẩm"
            rules={[{ required: true, message: 'Vui lòng nhập số seri!' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="status"
            label="Trạng thái phiếu bảo hành"
            rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}>
            <Select>
              <Option value="Đang hiệu lực">Đang hiệu lực</Option>
              <Option value="Hết hạn">Hết hạn</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="warrantyDate"
            label="Ngày bảo hành"
            rules={[
              { required: true, message: 'Vui lòng chọn ngày bảo hành!' },
            ]}>
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingRow ? 'Cập nhật' : 'Tạo mới'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default WarrantyList;
