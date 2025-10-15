"use client";

import { useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import DetailsUp from "@/components/Item/DetailsUp";
import DetailsDown from "@/components/Item/DetailsDown";
import useGetItem from "@/hooks/useGetItem";
import { useParams } from "next/navigation";
import ItemImage from "@/components/Item/ItemImage";
import SkeletonItem from "@/components/Item/SkeletonItem";
import { AnimatePresence } from "motion/react";
import dynamic from "next/dynamic";

const Specifications = dynamic(
  () => import("@/components/Item/Specifications")
);

export default function ItemPage() {
  const { id, type } = useParams();
  const [show, setShow] = useState<boolean>(false);

  const {
    data: item,
    isLoading: loading,
    isError,
    error,
  } = useGetItem(type, id);

  function showDescription() {
    setShow((prev) => !prev);
  }

  if (!type || !id || typeof type !== "string" || typeof id !== "string") {
    return <div>Invalid parameters</div>;
  }

  if (loading) return <SkeletonItem />;
  if (isError) return <div>Error: {error?.message}</div>;
  if (!item) return <div>Item is currently not available</div>;
  return (
    <>
      <div className="flex flex-col w-full md:flex-row py-10 md:mx-auto md:max-w-7xl">
        <ItemImage type={type} item={item} />
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <div className="flex flex-col gap-4 mt-10 md:mt-0">
            <DetailsUp item={item} />
            <DetailsDown id={item._id} count={item?.count} type={item.type} />
          </div>
        </div>
      </div>
      <div className="flex flex-col p-8">
        <div
          onClick={showDescription}
          className="flex justify-between w-full cursor-pointer select-none"
        >
          <p className="font-semibold">Product Details</p>
          {show ? <FaArrowDown /> : <FaArrowUp />}
        </div>
        <AnimatePresence>
          {show && <Specifications item={item} />}
        </AnimatePresence>
      </div>
    </>
  );
}
