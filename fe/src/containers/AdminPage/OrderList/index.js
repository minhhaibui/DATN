import {
  Button,
  message,
  Modal,
  Radio,
  Spin,
  Table,
  Tooltip,
  Row,
  Col,
} from 'antd';
import adminApi from 'apis/adminApi';
import helpers from 'helpers';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function generateFilterOrder() {
  let result = [];
  for (let i = 0; i < 8; ++i) {
    result.push({ value: i, text: helpers.convertOrderStatus(i) });
  }
  return result;
}

function OrderList() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataView, setDataView] = useState({});
  console.log({ dataView });
  const showModal = () => {
    setIsModalOpen(true);
  };

  // event: Cập nhật trạng thái đơn hàng
  const updateOrderStatus = async (id, orderStatus, idProduct, totalMoney) => {
    try {
      const response = await adminApi.postUpdateOrderStatus(id, orderStatus);

      if (response) {
        message.success('Cập nhật thành công');
        setData(
          data.map((item) =>
            item.orderId === id ? { ...item, orderStatus } : { ...item },
          ),
        );
      }
      if (orderStatus === 7) {
        const response = await adminApi.updateProductQuantity(
          idProduct,
          totalMoney,
        );
        if (response) {
          message.success('Cập nhật lại số lượng sản phẩm thành công');
        }
      }
    } catch (error) {
      message.success('Cập nhật thất bại');
    }
  };

  // modal cập nhật trạng thái đơn hàng
  function UpdateOrderStatusModal(
    defaultVal = 0,
    orderCode,
    orderId,
    idProduct,
    totalMoney,
  ) {
    let valueCurr = defaultVal;
    const modal = Modal.info({
      width: 768,
      title: `Cập nhật trạng thái đơn hàng #${orderCode}`,
      content: (
        <Radio.Group
          defaultValue={defaultVal}
          onChange={(v) => (valueCurr = v.target.value)}
          className="m-t-12">
          {generateFilterOrder().map((item, index) => (
            <Radio className="m-b-8" key={index} value={item.value}>
              {item.text}
            </Radio>
          ))}
        </Radio.Group>
      ),
      centered: true,
      icon: null,
      okText: 'Cập nhật',
      onOk: () => {
        updateOrderStatus(orderId, valueCurr, idProduct, totalMoney);
        modal.destroy();
      },
    });
  }

  const columns = [
    {
      title: 'khách hàng',
      key: 'owner',
      dataIndex: 'owner',
    },
    {
      title: 'Mã đơn hàng',
      key: 'orderCode',
      dataIndex: 'orderCode',
      render: (v, record) => (
        <div
          style={{ color: 'blue' }}
          className="cursor-pointer"
          onClick={() => {
            setDataView(record);
            showModal();
          }}>
          {v}
        </div>
      ),
    },
    {
      title: 'Ngày đặt',
      key: 'orderDate',
      dataIndex: 'orderDate',
      sorter: (a, b) => {
        if (a.orderDate > b.orderDate) return 1;
        if (a.orderDate < b.orderDate) return -1;
        return 0;
      },
    },
    {
      title: 'Sản phẩm',
      key: 'prodName',
      dataIndex: 'prodName',
      render: (prodName, record) => (
        <Tooltip title={prodName}>
          <Link to={`/product/${record.idProduct}`}>
            {helpers.reduceProductName(prodName, 30)}
          </Link>
        </Tooltip>
      ),
    },
    {
      title: 'Tổng tiền',
      key: 'totalMoney',
      dataIndex: 'totalMoney',
      render: (value) => (
        <b style={{ color: '#333' }}>{helpers.formatProductPrice(value)}</b>
      ),
      sorter: (a, b) => a.totalMoney - b.totalMoney,
    },
    {
      title: 'HT thanh toán',
      key: 'paymentMethod',
      dataIndex: 'paymentMethod',
      render: (value) => (value === 0 ? 'Tiền mặt' : 'VNPay'),
    },
    {
      title: 'Trạng thái đơn hàng',
      key: 'orderStatus',
      dataIndex: 'orderStatus',
      filters: generateFilterOrder(),
      onFilter: (value, record) => record.orderStatus === value,
      render: (value) => helpers.convertOrderStatus(value),
    },
    {
      title: '',
      render: (_v, records) => {
        console.log(records);
        return records.orderStatus !== 7 ? (
          <Button
            type="dashed"
            onClick={() =>
              UpdateOrderStatusModal(
                records.orderStatus,
                records.orderCode,
                records.orderId,
                records.idProduct,
                records.totalMoney,
              )
            }>
            Cập nhật
          </Button>
        ) : (
          <></>
        );
      },
    },
  ];

  useEffect(() => {
    let isSubscribe = true;
    async function getOrderList() {
      try {
        setIsLoading(true);
        const response = await adminApi.getOrderList();
        if (isSubscribe && response) {
          const { list } = response.data;
          const newList = list.map((item, index) => {
            return {
              key: index,
              owner: item.owner,
              orderCode: item.orderCode,
              orderDate: helpers.formatOrderDate(item.orderDate),
              prodName: item.orderProd.name,
              totalMoney:
                item.numOfProd *
                (item.orderProd.price -
                  (item.orderProd.price * item.orderProd.discount) / 100),
              paymentMethod: item.paymentMethod,
              orderStatus: item.orderStatus,
              idProduct: item.orderProd.id,
              orderId: item._id,
              deliveryAdd: item.deliveryAdd,
            };
          });
          setData([...newList]);
          setIsLoading(false);
        }
      } catch (error) {
        if (isSubscribe) setIsLoading(false);
      }
    }
    getOrderList();
    return () => {
      isSubscribe = false;
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <Spin className="trans-center" tip="Đang lấy danh sách đơn hàng ..." />
      ) : (
        <>
          <Table
            columns={columns}
            dataSource={data}
            pagination={{ showLessItems: true, position: ['bottomCenter'] }}
          />
          <Modal
            visible={isModalOpen}
            closable={true}
            maskClosable={false}
            onCancel={() => {
              setIsModalOpen(false);
            }}
            centered
            width={768}
            footer={[<div></div>]}>
            <div>
              <h1>Chi tiết đơn hàng</h1>
              <div>
                <Row>
                  <Col>Tên người mua: </Col>
                  <Col>
                    {' '}
                    <b> {' ' + dataView?.deliveryAdd?.name}</b>
                  </Col>
                </Row>
                <Row>
                  <Col>Địa chỉ: </Col>
                  <Col>
                    {' '}
                    <b>
                      {' '}
                      {' ' +
                        dataView?.deliveryAdd?.address?.details +
                        ' - ' +
                        dataView?.deliveryAdd?.address?.province +
                        ' - ' +
                        dataView?.deliveryAdd?.address?.district +
                        ' - ' +
                        dataView?.deliveryAdd?.address?.province}
                    </b>
                  </Col>
                </Row>
                <Row>
                  <Col>HT thanh toán: </Col>
                  <Col>
                    {' '}
                    <b>
                      {' '}
                      {' ' + (dataView?.paymentMethod === 0)
                        ? 'Tiền mặt'
                        : 'VNPay'}
                    </b>
                  </Col>
                </Row>
                <Row>
                  <Col>Tổng tiền: </Col>
                  <Col>
                    {' '}
                    <b>
                      {' '}
                      {' ' + helpers.formatProductPrice(dataView?.totalMoney)}
                    </b>
                  </Col>
                </Row>
                <Row>
                  <Col>Trạng thái: </Col>
                  <Col>
                    {' '}
                    <b>
                      {' '}
                      {' ' + helpers.convertOrderStatus(dataView?.orderStatus)}
                    </b>
                  </Col>
                </Row>
              </div>
            </div>
          </Modal>
        </>
      )}
    </>
  );
}

export default OrderList;
