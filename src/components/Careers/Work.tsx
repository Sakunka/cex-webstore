import Image from "next/image";
import React from "react";

export default function Work() {
  const details = [
    {
      name: "Technology",
      logo: "/images/details/tech.svg",
      desc: "Latest Gadgets, Infrastructure & Development",
    },
    {
      name: "Teamwork",
      logo: "/images/details/team.svg",
      desc: "Cross functional teams at Store and Support Centre level",
    },
    {
      name: "Culture",
      logo: "/images/details/culture.svg",
      desc: "Non corporate working environment",
    },
    {
      name: "Travel",
      logo: "/images/details/travel.svg",
      desc: "Local, international, business and pleasure",
    },
    {
      name: "Incentive Schemes",
      logo: "/images/details/incentive.svg",
      desc: "Staff discounts, bonus schemes and other rewards",
    },
    {
      name: "Progression Opportunities",
      logo: "/images/details/progression.svg",
      desc: "90%+ of Support and Management staff started in one of our stores",
    },
    {
      name: "Celebrate Indivituality",
      logo: "/images/details/celebrate.svg",
      desc: "Be yourself!",
    },
    {
      name: "Flexibility",
      logo: "/images/details/flexibility.svg",
      desc: "Working times and days that suit",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {details.map((item, ind) => (
        <div
          key={ind}
          className="flex flex-col justify-center items-center p-4"
        >
          <Image
            width={100}
            height={120}
            alt={item.name}
            src={item.logo}
            className="mb-2"
          />
          <h3 className="font-bold text-center">{item.name}</h3>
          <p className="font-semibold text-center text-sm text-gray-600">
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  );
}
