"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import type { Types } from "mongoose";
import "react-loading-skeleton/dist/skeleton.css";
import { useLatest } from "@/hooks/home/useLatest";
import SkeletonCard from "./SkeletonCard";
import { Navigation, Pagination } from "swiper/modules";
import Item from "../ui/Item";

type Media = {
  _id: Types.ObjectId;
  name: string;
  price: number;
  genre: string;
  year: number;
  subtitles: string;
  age_rating: string;
  image: string;
  publisher: string;
  count: number;
};

export default function PopularMedia() {
  const { data, isLoading, error } = useLatest("media");

  return (
    <div className="w-full mt-8 mb-15">
      <h2 className="font-bold text-2xl pb-5">Recommended Medias</h2>
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
            ? Array.from({ length: 6 }).map((_, ind) => (
                <SwiperSlide key={ind}>
                  <SkeletonCard />
                </SwiperSlide>
              ))
            : data?.data?.items?.map((item: Media) => (
                <SwiperSlide key={item._id.toString()}>
                  <Item item={item} type="media" />
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </div>
  );
}
