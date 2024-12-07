import { Carousel } from 'antd';
import React from 'react';
import './index.scss';

// Do cả chương trình chỉ có 1 list carousel
// Nên lưu thẳng vào đây để đỡ tốn chi phí query
const list = [
  'https://res.cloudinary.com/t-engine/image/upload/v1657046100/unnamed_2_d2ccjd_vr6wi3.webp',
  'https://res.cloudinary.com/t-engine/image/upload/v1657046100/unnamed_flqfng_notndb.webp',
  'https://res.cloudinary.com/t-engine/image/upload/v1657046100/unnamed_1_t5luv4_vfprez.webp',
];

function ProductCarousel() {
  return (
    <Carousel className="Product-Carousel m-tb-24 bor-rad-8" autoplay>
      {list.map((item, index) => (
        <img
          className="Product-Carousel-img bor-rad-8"
          src={item}
          key={index}
        />
      ))}
    </Carousel>
  );
}

export default ProductCarousel;
