import Image from "next/image";
import React from "react";

export default function Countries() {
  const countryList = [
    {
      name: "Australia",
      logo: "/images/countries/au.svg",
    },
    {
      name: "Canary Islands",
      logo: "/images/countries/ic.svg",
    },
    {
      name: "India",
      logo: "/images/countries/in.svg",
    },
    {
      name: "Ireland",
      logo: "/images/countries/ie.svg",
    },
    {
      name: "italy",
      logo: "/images/countries/it.svg",
    },
    {
      name: "Mexico",
      logo: "/images/countries/mx.svg",
    },
    {
      name: "Netherlands",
      logo: "/images/countries/nl.svg",
    },
    {
      name: "Poland",
      logo: "/images/countries/pl.svg",
    },
    {
      name: "Portugal",
      logo: "/images/countries/pt.svg",
    },
    {
      name: "Spain",
      logo: "/images/countries/es.svg",
    },
    {
      name: "UK",
      logo: "/images/countries/uk.svg",
    },
    {
      name: "Malaysia",
      logo: "/images/countries/my.svg",
    },
  ];
  return (
    <div className="flex flex-col gap-10 my-20">
      <p className="text-3xl font-bold text-center">
        Interested in working in these locations?
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 w-4/5 mx-auto gap-3">
        {countryList.map((item, ind) => (
          <div className="flex flex-col justify-center items-center">
            <Image
              width={120}
              height={220}
              src={item.logo}
              key={ind}
              alt={item.name}
            />
            <p className="font-semibold">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
