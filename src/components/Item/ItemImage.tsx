import React from "react";
import Image from "next/image";

export default function ItemImage({ type, item }) {
  return (
    <div className="w-1/2 pr-8 flex justify-center">
      <Image
        src={item.image}
        alt={item.name}
        width={300}
        height={300}
        className="object-cover rounded-lg shadow-md"
      />
    </div>
  );
}
