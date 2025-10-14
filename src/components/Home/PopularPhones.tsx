"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import type { Types } from "mongoose";
import { useLatest } from "@/hooks/home/useLatest";
import SkeletonCard from "./SkeletonCard";
import Item from "../ui/Item";

type Phone = {
  _id: Types.ObjectId;
  name: string;
  price: number;
  OS: string;
  manufacturer: string;
  network: string;
  color: string;
  image: string;
};

export default function PopularPhones() {
  const { data, isLoading, error } = useLatest("phone");

  if (error) {
    return <div className="text-red-600">Greška pri učitavanju telefona</div>;
  }

  return (
    <div className="w-full mt-8 mb-15">
      <h2 className="font-bold text-2xl pb-5">Recommended Phones</h2>
      <div className="w-full overflow-hidden">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={2}
          breakpoints={{
            200: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
          className="w-full"
        >
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <SwiperSlide key={`skeleton-${index}`}>
                  <SkeletonCard />
                </SwiperSlide>
              ))
            : data?.data?.items?.map((item: Phone) => (
                <SwiperSlide key={item._id.toString()}>
                  <Item item={item} type="phone" />
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </div>
  );
}
