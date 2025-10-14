import { formatDate } from "@/lib/formatDate";
import React from "react";
import { MdPending } from "react-icons/md";

export default function PurchaseDetails({ order }) {
  const icons = {
    PENDING: MdPending,
  };
  const StatusIcon = icons[order.status] || icons.PENDING;

  return (
    <div className="flex flex-row justify-between bg-[#f7f7f7] p-3 rounded-t-lg">
      <div className="flex flex-col">
        <span className="text-sm text-gray-600">
          {formatDate(order.createdAt)}
        </span>
        <span className="font-semibold">Order #{order.orderNumber}</span>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-sm">
          {order.items.length} Items for €{order.pricing.total}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{order.status}</span>
          <StatusIcon className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
