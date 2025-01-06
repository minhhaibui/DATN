import React from 'react';
import { Row, Col, Card, Typography, Space } from 'antd';
import { Line } from 'react-chartjs-2';

const { Title, Text } = Typography;

const Statistical = () => {
  // Dữ liệu cho biểu đồ đường
  const lineChartData = {
    labels: [
      'Tháng 1',
      'Tháng 2',
      'Tháng 3',
      'Tháng 4',
      'Tháng 5',
      'Tháng 7',
      'Tháng 7',
      'Tháng 8',
      'Tháng 9',
      'Tháng 10',
      'Tháng 11',
      'Tháng 12',
    ],
    datasets: [
      {
        label: 'Doanh thu (triệu VNĐ)',
        data: [
          100,
          150,
          200,
          180,
          230,
          300,
          350,
          345,
          500,
          400,
          600,
          445,
          456,
          478,
        ],
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 1)',
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.4,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Tháng',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Doanh thu (triệu VNĐ)',
        },
        beginAtZero: true,
      },
    },
  };

  // Dữ liệu thống kê
  const stats = {
    totalOrders: 520,
    bestSellingProduct: 'iphone 15ProMax',
    totalSales: '6 tỷ VNĐ',
    revenue: '4 tỷ VNĐ',
  };

  return (
    <div
      style={{
        padding: '20px',
        maxWidth: '90%', // Chỉ chiếm 50% chiều rộng của trang
        margin: '0 auto', // Căn giữa toàn bộ giao diện
      }}>
      <Row gutter={[16, 16]} style={{ alignItems: 'stretch' }}>
        {/* Biểu đồ đường */}
        <Col span={18}>
          <Card
            title="Doanh thu theo tháng"
            bordered={false}
            style={{ height: '100%' }}>
            <Line
              data={lineChartData}
              options={lineChartOptions}
              height={250}
            />
          </Card>
        </Col>

        {/* Card hiển thị thống kê */}
        <Col span={6}>
          <Card
            title="Thống kê"
            bordered={false}
            style={{
              height: '100%',
              background: '#ffffff', // Nền trắng
            }}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div style={{ padding: '10px', backgroundColor: '#ffe5e5' }}>
                <Title level={5} style={{ margin: 0 }}>
                  Tổng đơn hàng
                </Title>
                <Text>{stats.totalOrders} đơn</Text>
              </div>
              <div style={{ padding: '10px', backgroundColor: '#e5f7ff' }}>
                <Title level={5} style={{ margin: 0 }}>
                  Sản phẩm bán chạy nhất
                </Title>
                <Text>{stats.bestSellingProduct}</Text>
              </div>
              <div style={{ padding: '10px', backgroundColor: '#e5ffe5' }}>
                <Title level={5} style={{ margin: 0 }}>
                  Tổng số tiền bán
                </Title>
                <Text>{stats.totalSales}</Text>
              </div>
              <div style={{ padding: '10px', backgroundColor: '#fffbe5' }}>
                <Title level={5} style={{ margin: 0 }}>
                  Doanh thu
                </Title>
                <Text>{stats.revenue}</Text>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Statistical;
