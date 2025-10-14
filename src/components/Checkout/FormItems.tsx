import { defaultFields } from "@/constants/defaultFields";
import React from "react";

export default function FormItems({ register }: any) {
  return (
    <>
      {defaultFields.map((field) => (
        <div key={field.name} className="mb-4">
          <label
            htmlFor={field.name}
            className="block text-sm text-gray-700 mb-1 font-semibold"
          >
            {field.label} {field.required && "*"}
          </label>
          <input
            id={field.name}
            type={field.type}
            {...register(field.name, {
              required: field.required ? `${field.label} is required` : false,
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-4xl"
            placeholder={field.placeholder}
          />
        </div>
      ))}
    </>
  );
}
