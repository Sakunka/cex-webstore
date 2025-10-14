"use client";

import { useForm } from "react-hook-form";
import FilterItem from "./FilterItem";
import Loader from "../ui/Loader";
export default function Filters({ data, loading, onFiltersApply }: any) {
  const { register, handleSubmit } = useForm();

  if (loading) {
    return <Loader width={100} height={80} />;
  }

  const filters = data;

  const onSubmit = (formData: any) => {
    const cleanedData: { [key: string]: any } = {};

    Object.entries(formData).forEach(([key, value]) => {
      if (value && value !== "" && value !== false && value !== "false") {
        cleanedData[key] = value;
      }
    });

    onFiltersApply(cleanedData);
  };

  return (
    <div className="w-full flex flex-col mt-2">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        {Object.entries(filters).map(([category, categoryData]) => (
          <FilterItem
            key={category}
            category={category}
            register={register}
            categoryData={categoryData}
          />
        ))}

        <button
          className="flex justify-center bg-red-600 rounded-4xl mx-auto mt-10 px-10 py-3 text-white w-full"
          type="submit"
        >
          Apply Filters
        </button>
      </form>
    </div>
  );
}
