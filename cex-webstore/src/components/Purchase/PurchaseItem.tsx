import React from "react";

export default function PurchaseItem({ item }) {
  return (
    <div className="flex flex-col items-center">
      {item.image && (
        <img
          width={120}
          src={item.image}
          alt={item.name}
          className="rounded-lg mb-2"
        />
      )}
      <div className="text-center">
        <p className="text-sm font-medium">{item.name}</p>
        <p className="text-xs text-gray-600">
          Qty: {item.quantity} - €{item.price}
        </p>
      </div>
    </div>
  );
}
