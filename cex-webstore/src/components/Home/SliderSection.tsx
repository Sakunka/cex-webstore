"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import SliderImage from "./SliderImage";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { sliderImages } from "@/constants/sliderImages";

export default function SliderSection() {
  return (
    <div className="w-full md:w-3/4 rounded-2xl border-2">
      <Swiper pagination={true} modules={[Pagination]}>
        {sliderImages.map((item, ind) => (
          <SwiperSlide key={ind}>
            <SliderImage item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
