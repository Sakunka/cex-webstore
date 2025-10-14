import React from "react";

export default function CheckoutInput({
  categoryData,
  category,
  register,
}: any) {
  return (
    <div className="pt-2">
      {categoryData.availableValues?.map((item: any, index: number) => (
        <div className="flex align-middle mb-2" key={index}>
          <input
            className="w-5 h-5 cursor-pointer"
            type="checkbox"
            value={item}
            {...register(category)}
          />
          <span className="ml-2">{item}</span>
        </div>
      ))}
    </div>
  );
}
