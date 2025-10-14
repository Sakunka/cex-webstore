import React from "react";

export default function Image({ type, item }) {
  return (
    <div className="w-1/2 pr-8 flex justify-center">
      <img
        src={item.image}
        alt={item.name}
        width={300}
        className="object-cover rounded-lg shadow-md"
      />
    </div>
  );
}
