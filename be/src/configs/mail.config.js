// main.js
const nodemailer = require('nodemailer');

// configure option
const option = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODE_MAILER_USER,
    pass: process.env.NODE_MAILER_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(option);

// send email
const sendEmail = async ({ to, subject, text, html, ...rest }) => {
  try {
    const res = await transporter.verify();
    if (res) {
      //config mail
      const mail = {
        //sender access
        from: '"Store" <no-reply@accounts.store.com>',
        //receiver access
        to,
        //subject
        subject,
        //content text
        text,
        //html
        html,
        //others
        ...rest,
      };
      //Tiến hành gửi email
      const info = await transporter.sendMail(mail);
      if (info) {
        return true;
      }
    }
  } catch (err) {
    console.error('ERROR MAILER: ', err);
    return false;
  }
};

const headerHtmlMail = `<h1 style="color: #4c649b; font-size: 48px; border-bottom: solid 2px #ccc;padding-bottom: 10px">
      Store<br />
    </h1>`;
const footerHtmlVerifyMail = `<h3 style="color: red">
        Chú ý: Không đưa mã này cho bất kỳ ai,
        có thể dẫn đến mất tài khoản.<br />
        Mã chỉ có hiệu lực <i>10 phút </i> từ khi bạn nhận được mail.
    </h3>
    <h1>Cảm ơn.</h1>`;

// gửi mã xác nhận
const htmlSignupAccount = (token) => {
  return `<div>
    ${headerHtmlMail}
    <h2 style="padding: 10px 0; margin-bottom: 10px;">
        Xin chào anh (chị),<br />
        Mã xác nhận đăng ký tài khoản cho website Store của anh (chị).<br />
        Cảm ơn vì đã ghé thăm Store <3
    </h2>
    <h3 style="background: #eee;padding: 10px;">
      <i><b>${token}</b></i>
    </h3>
  ${footerHtmlVerifyMail}
  </div>`;
};

// gửi mã đổi mật khẩu
const htmlResetPassword = (token) => {
  return `<div>
    ${headerHtmlMail}
    <h2 style="padding: 10px 0; margin-bottom: 10px;">
        Xin chào anh (chị),<br />
        Cửa hàng Store đã nhận được yêu cầu lấy lại mật khẩu từ quý khách.<br />
        Đừng lo lắng, hãy nhập mã này để khôi phục:
    </h2>
    <h1 style="background: #eee;padding: 10px;">
      <i><b>${token}</b></i>
    </h1>
    ${footerHtmlVerifyMail}
  </div>`;
};

// gửi thông báo đăng nhập sai quá nhiều
const htmlWarningLogin = () => {
  return `<div>
   ${headerHtmlMail}
    <h2 style="padding: 10px 0; margin-bottom: 10px;">
        Xin Chào anh (chị),<br />
        Cửa hàng nghi ngờ có ai đó đã cố gắng đăng nhập vào tài khoản của quý khách.<br />
        Nếu quý khác không nhớ mật khẩu hãy nhấn vào "Quên mật khẩu" để lấy lại mật khẩu<br/>
    </h2>
    <h1>Cảm ơn.</h1>
  </div>`;
};
// thông bao bảo hành
const generateWarrantyEmailContent = (warrantyInfo) => {
  const {
    serialNumber,
    customerName,
    customerPhone,
    customerAddress,
    purchaseDate,
    warrantyEndDate,
    registrationDate,
    productName,
    color,
    price,
    discount,
    voucher
  } = warrantyInfo;

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #007bff;">Thông Tin Bảo Hành</h2>
      <p>Kính gửi <strong>${customerName}</strong>,</p>
      <p>Cảm ơn quý khách đã tin tưởng và sử dụng sản phẩm của chúng tôi. Dưới đây là thông tin bảo hành chi tiết:</p>
      <table style="border-collapse: collapse; width: 100%; margin: 20px 0;">
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;"><strong>Số Seri</strong></td>
          <td style="border: 1px solid #ddd; padding: 8px;">${serialNumber}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;"><strong>Tên Sản Phẩm</strong></td>
          <td style="border: 1px solid #ddd; padding: 8px;">${productName}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;"><strong>Màu Sắc</strong></td>
          <td style="border: 1px solid #ddd; padding: 8px;">${color}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;"><strong>Giá</strong></td>
          <td style="border: 1px solid #ddd; padding: 8px;">${price.toLocaleString()} VND</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;"><strong>Giảm Giá</strong></td>
          <td style="border: 1px solid #ddd; padding: 8px;">${(discount * 100).toFixed(2)}%</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;"><strong>Voucher</strong></td>
          <td style="border: 1px solid #ddd; padding: 8px;">${voucher.toLocaleString()} VND</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;"><strong>Ngày Mua</strong></td>
          <td style="border: 1px solid #ddd; padding: 8px;">${purchaseDate}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;"><strong>Ngày Đăng Ký Bảo Hành</strong></td>
          <td style="border: 1px solid #ddd; padding: 8px;">${registrationDate}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;"><strong>Ngày Hết Hạn Bảo Hành</strong></td>
          <td style="border: 1px solid #ddd; padding: 8px;">${warrantyEndDate}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;"><strong>Tổng Cộng</strong></td>
          <td style="border: 1px solid #ddd; padding: 8px;">${(price - (price * discount) - voucher).toLocaleString()} VND</td>
        </tr>
      </table>
<p>Chúng tôi kính mong quý khách mang thiết bị đến trực tiếp cửa hàng vào ngày <strong>${registrationDate}</strong> tại địa chỉ: <strong>${customerAddress}</strong>, để đội ngũ kỹ thuật viên của chúng tôi có thể hỗ trợ kiểm tra và xử lý một cách nhanh chóng và hiệu quả nhất.</p>
<p>Nếu quý khách có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua số điện thoại: <strong>${customerPhone}</strong> hoặc địa chỉ: <strong>${customerAddress}</strong>.</p>
<p>Trân trọng,</p>
<p>Đội Ngũ Hỗ Trợ Khách Hàng</p>

    </div>
  `;
};

module.exports = {
  sendEmail,
  htmlSignupAccount,
  htmlResetPassword,
  htmlWarningLogin,
  generateWarrantyEmailContent
};
