import React from "react";

export default function PriceFilter({ register }: any) {
  return (
    <div className="flex justify-center flex-col text-center">
      <h3>By Price</h3>
      <div className="flex flex-row gap-2 justify-center">
        <input
          className="text-center w-30 rounded-4xl h-8 text-xl pl-3 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
          type="number"
          placeholder="min"
          {...register("min")}
        />
        <span className="pt-1">to</span>
        <input
          className="text-center w-30 rounded-4xl h-8 text-xl pl-3 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
          type="number"
          placeholder="max"
          {...register("max")}
        />
      </div>
    </div>
  );
}
