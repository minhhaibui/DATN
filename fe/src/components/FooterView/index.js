import {
  FacebookFilled,
  GooglePlusSquareFilled,
  LinkedinFilled,
  PhoneOutlined,
  TwitterSquareFilled,
} from '@ant-design/icons';
import iconPhoneFooter from 'assets/imgs/icon-phone-footer.png';
import registeredImg from 'assets/imgs/registered.png';
import React from 'react';
import './index.scss';
function FooterView() {
  return (
    <div className="container-fluid bg-white footer p-lr-0" id="footer">
      {/* Liên hệ */}
      <div className="footer-contact p-tb-16">
        <div className="container d-flex justify-content-between align-i-center">
          <PhoneOutlined className="phone-icon" />
          <div className="d-flex flex-direction-column">
            <h2 className="footer-contact-item">Tư vấn mua hàng</h2>
            <h2 className="footer-contact-item">
              <b>0865699025</b>
            </h2>
          </div>
          <div className="d-flex flex-direction-column">
            <h2 className="footer-contact-item">Tư vấn đào tạo</h2>
            <h2 className="footer-contact-item">
              <b>0865699025</b>
            </h2>
          </div>
          <div className="d-flex flex-direction-column">
            <h2 className="footer-contact-item">Tư vấn quảng cáo</h2>
            <h2 className="footer-contact-item">
              <b>0865699025</b>
            </h2>
          </div>
          <div className="d-flex flex-direction-column">
            <h2 className="footer-contact-item">Hỗ trợ kỹ thuật</h2>
            <h2 className="footer-contact-item">
              <b>0865699025</b>
            </h2>
          </div>
        </div>
      </div>
      {/* Thông tin chi tiết */}
      <div className="container p-tb-32">
        <p className="t-center" style={{ color: '#888' }}>
          <span className="font-size-18px">ĐẠI HỌC THỦY LỢI</span>
          <br />
          <strong>Trụ sở:</strong>&nbsp; 175 tây sơn đống đa hà nội
          <br />
          <strong>Văn phòng:</strong>&nbsp;175 tây sơn đống đa hà nội
          <br />
          <strong>Điện&nbsp;thoại:</strong>&nbsp;0865699025 |{' '}
          <strong>Email:</strong>&nbsp;haib6273@gmail.com&nbsp;|{' '}
          <strong>Website:</strong>&nbsp;<a href="/">store.vn</a>
        </p>
        <div className="d-flex align-i-center justify-content-center">
          <img src={registeredImg} width={175} />
          <div className="d-flex align-i-center m-lr-32">
            <img src={iconPhoneFooter} />
            <div className="t-center m-l-16">
              <h2 style={{ color: '#CE1F26' }}>Hotline</h2>
              <h2 style={{ color: '#CE1F26' }}>0865699025</h2>
            </div>
          </div>
          <div className="d-flex">
            <a href="https://www.facebook.com/hathu.vu.357" target="blank">
              <FacebookFilled
                className="p-lr-4 social-item"
                style={{ fontSize: 36, color: '#0C86EF' }}
              />
            </a>
            <a href="https://www.linkedin.com/">
              <LinkedinFilled
                className="p-lr-4 social-item"
                style={{ fontSize: 36, color: '#0073B1' }}
              />
            </a>
            <a href="https://mail.google.com" target="blank">
              {' '}
              <GooglePlusSquareFilled
                className="p-lr-4 social-item"
                style={{ fontSize: 36, color: '#DB5247' }}
              />
            </a>

            <a href="https://twitter.com/" target="blank">
              <TwitterSquareFilled
                className="p-lr-4 social-item"
                style={{ fontSize: 36, color: '#55ACEF' }}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FooterView;
