import { Carousel } from 'antd';
import React from 'react';
import './index.scss';

// Do cả chương trình chỉ có 1 list carousel
// Nên lưu thẳng vào đây để đỡ tốn chi phí query
const list = [
  'https://res.cloudinary.com/diwpwppzr/image/upload/v1702913901/slider/apw8opsb1ihehlyib8bx.jpg',
  'https://res.cloudinary.com/diwpwppzr/image/upload/v1702913900/slider/xdvxree1fqgt2odzd6ab.jpg',
  'https://res.cloudinary.com/diwpwppzr/image/upload/v1702913900/slider/lggpxfpweojjj480mlho.jpg',
  'https://res.cloudinary.com/diwpwppzr/image/upload/v1702913900/slider/nxtrhuergj0ardi0dcki.jpg',
  'https://res.cloudinary.com/diwpwppzr/image/upload/v1702913900/slider/myehkavbtwrvx2ffp44j.png',
  'https://res.cloudinary.com/diwpwppzr/image/upload/v1702913900/slider/zpcsek2rjmjgfwon3uye.png',
  'https://res.cloudinary.com/diwpwppzr/image/upload/v1702913899/slider/kgmjrgxiznuonlqa3lih.png',
  'https://res.cloudinary.com/diwpwppzr/image/upload/v1702913899/slider/bekiiijhqgbk1unfljhp.jpg',
  'https://res.cloudinary.com/diwpwppzr/image/upload/v1702913899/slider/uzbqbwistbwubock99al.png',
  'https://res.cloudinary.com/diwpwppzr/image/upload/v1702913899/slider/udaip4padsey9ofugutz.jpg',

];

function SaleOff() {
  return (
    <Carousel className="Sale-Off" autoplay>
      {list.map((item, index) => (
        <img className="Sale-Off-img" src={item} key={index} />
      ))}
    </Carousel>
  );
}

export default SaleOff;
