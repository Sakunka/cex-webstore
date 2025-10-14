"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function Awards() {
  const awards = [
    "/images/awards/bfa-im.png",
    "/images/awards/bfa-logo.jpeg",
    "/images/awards/ef100-25-top-50-logo.jpg",
    "/images/awards/ifa-im.png",
    "/images/awards/top-1-im.png",
    "/images/awards/top-2-im.png",
    "/images/awards/top-4-im.png",
    "/images/awards/top-6-im.png",
    "/images/awards/winner-awards.png",
  ];

  return (
    <div className="w-full max-w-none py-10">
      <Swiper spaceBetween={50} slidesPerView={5} loop={true}>
        {awards.map((item, index) => (
          <SwiperSlide key={index}>
            <img src={item} width={180} alt={`Award ${index}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
