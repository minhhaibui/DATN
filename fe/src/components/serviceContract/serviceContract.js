import {
  Checkbox,
  Col,
  DatePicker,
  Input,
  message,
  Modal,
  Row,
  Spin,
  Table,
  Tooltip,
} from 'antd';
import orderApi from 'apis/orderApi';
import warrantyApi from 'apis/warrantyApi';
import helpers from 'helpers';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ServiceContract(props) {
  const { _id: userId } = useSelector((state) => state.user);
  const { orderId, onClose } = props;
  const [visible, setVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    orderDate: '',
  });
  const [error, setError] = useState(null);
  console.log('order', order);
  console.log('userId', userId);
  // Lấy chi tiết đơn hàng
  useEffect(() => {
    let isSubscribe = true;

    async function getOrderDetails() {
      try {
        const response = await orderApi.getOrderDetails(orderId);
        if (isSubscribe && response) {
          setOrder(response.data.order);
          setIsLoading(false);
          setForm((prev) => ({
            ...prev,
            name: response.data.order?.deliveryAdd?.name,
            phone: response.data.order?.deliveryAdd?.phone,
            orderDate: response.data.order?.orderDate,
            voucher: response.data.order?.vouchersDetails?.discountPercentage,
          }));
        }
      } catch (error) {
        if (isSubscribe) {
          setIsLoading(false);
          setOrder(null);
        }
      }
    }

    getOrderDetails().then();
    return () => {
      isSubscribe = false;
    };
  }, [orderId]);
  console.log('form', form);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleDatePickerChange = (date, dateString) => {
    // Lưu timestamp thay vì đối tượng moment
    const inputDate = new Date(date._d);
    console.log(date._d);
    setForm((prevForm) => ({
      ...prevForm,
      warranty_date: dateString,
    }));
  };
  // Xử lý lưu thông tin
  const handleSubmit = async () => {
    if (!form.warranty_date) {
      setError('Vui lòng điền đầy đủ thông tin.');
      return;
    }
    if (!form.productList || !form.productList.length) {
      setError('vui lòng chọn sản phẩm bảo hành');
      return;
    }
    const data = { ...form, user_id: userId, order_id: orderId };
    const response = await warrantyApi.createWarranty(data);
    if (response) {
      message.success('đăng ký thành công');
    }
    setError(null);

    onClose();
  };
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      const formattedData = selectedRows.map((row) => ({
        serial: row.serial,
        name: row.orderProd?.name,
        price: row.orderProd?.price,
        discount: row.orderProd?.discount,
        id: row.orderProd?.id,
      }));

      // Lưu vào form
      setForm((prev) => ({
        ...prev,
        productList: formattedData,
      }));
    },
  };
  return (
    <Modal
      width={1000}
      centered
      open={visible}
      onCancel={() => {
        setVisible(false);
        onClose();
      }}
      onOk={handleSubmit}
      okText="Đăng ký"
      title={
        <p className="font-size-18px m-b-0">
          Đăng ky bảo hành
          {order && (
            <>
              <span style={{ color: '#4670FF' }}>{` #${order.orderCode}`}</span>
            </>
          )}
        </p>
      }>
      {isLoading ? (
        <div className="pos-relative" style={{ minHeight: 180 }}>
          <Spin
            className="trans-center"
            tip="Đang tải chi tiết đơn hàng..."
            size="large"
          />
        </div>
      ) : (
        <Row gutter={[16, 16]}>
          {/* Hiển thị thông tin đơn hàng */}
          <Col span={24}>
            <Table
              rowSelection={rowSelection}
              pagination={false}
              columns={[
                {
                  title: 'Số seri',
                  dataIndex: 'serial',
                  key: 'serial',
                },
                {
                  title: 'Sản phẩm',
                  dataIndex: 'prod',
                  key: 'prod',
                  render: (v, record) => (
                    <p>
                      <Tooltip title={record.orderProd.name}>
                        {helpers.reduceProductName(record.orderProd.name, 40)}
                      </Tooltip>
                    </p>
                  ),
                },
                {
                  title: 'Giá',
                  dataIndex: 'price',
                  key: 'price',
                  render: (v, record) =>
                    helpers.formatProductPrice(record.orderProd.price),
                },
                {
                  title: 'Số lượng',
                  dataIndex: 'numOfProd',
                  key: 'numOfProd',
                },
                {
                  title: 'Giảm giá',
                  dataIndex: 'discount',
                  key: 'discount',
                  render: (v, record) => `${record.orderProd.discount} %`,
                },
                {
                  title: 'Tổng',
                  dataIndex: 'totalMoney',
                  key: 'totalMoney',
                  render: (v, record) => {
                    const { price, discount } = record.orderProd;
                    return helpers.formatProductPrice(
                      price - (price * discount) / 100,
                    );
                  },
                },
              ]}
              dataSource={Array.from({ length: order.numOfProd }).map(
                (_, i) => ({
                  key: `${order.orderProd.id}-${i}`,
                  serial: order.serialNumbers[i],
                  orderProd: order.orderProd,
                  numOfProd: 1,
                  discount: order.orderProd.discount,
                  totalMoney:
                    order.orderProd.price -
                    (order.orderProd.price * order.orderProd.discount) / 100, // Tổng tiền sau giảm giá
                }),
              )}
            />
          </Col>

          {/* Form đăng ký */}
          <Col span={24}>
            <h3>Thông tin đăng ký</h3>
            <Input
              name="name"
              placeholder="Họ và tên"
              value={form.name}
              onChange={handleInputChange}
              className="m-b-12"
              disabled
            />
            <Input
              name="phone"
              placeholder="Số điện thoại"
              value={form.phone}
              onChange={handleInputChange}
              className="m-b-12"
              disabled
            />
            <Input
              name="phone"
              placeholder="Số điện thoại"
              value={helpers.formatOrderDate(form.orderDate)}
              onChange={handleInputChange}
              className="m-b-12"
              disabled
            />
            <DatePicker
              name="warranty_date"
              placeholder="Chọn ngày bảo hành"
              format={'YYYY/MM/DD'}
              className="m-b-12"
              onChange={handleDatePickerChange}
            />
            <Input.TextArea
              name="note"
              placeholder="Mô tả lỗi sản phẩm"
              value={form.note}
              onChange={handleInputChange}
              className="m-b-12"
              rows={4}
            />
            <div>{error && <p style={{ color: 'red' }}>{error}</p>}</div>
          </Col>
        </Row>
      )}
    </Modal>
  );
}

ServiceContract.propTypes = {
  orderId: PropTypes.string,
  onClose: PropTypes.func,
};

export default ServiceContract;
