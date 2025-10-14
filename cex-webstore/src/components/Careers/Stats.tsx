import React from "react";

export default function Stats() {
  const stats = [
    {
      name: "stores worldwide",
      num: 600,
    },
    {
      name: "employees",
      num: 3000,
    },
    {
      name: "territories",
      num: 10,
    },
  ];
  return (
    <>
      {stats.map((item) => (
        <div className="p-6">
          <p className="text-3xl">{item.num} +</p>
          <p className="text-2xl">{item.name}</p>
        </div>
      ))}
    </>
  );
}
