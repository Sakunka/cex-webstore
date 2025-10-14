import { IoCheckmark } from "react-icons/io5";

export default function Package() {
  const packageFeatures = [
    "Initial training and ongoing procedure updates",
    "Limited competition",
    "Stock and pricing advice from experts",
    "Ongoing support including intranet and business services",
    "Hands-on store identification, design and outfit",
    "Bespoke EPOS designed especially for buying, selling and exchanging goods",
  ];

  const link = "/images/franchises/what-you-will-receive-mobile.png";

  return (
    <div className="container mx-auto flex flex-row gap-8 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="order-2 md:order-1">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5">
            Included in the franchise package
          </h2>
          <ul className="space-y-7">
            {packageFeatures.map((feature, index) => (
              <li className="flex flex-row items-center gap-4" key={index}>
                <IoCheckmark className="font-bold" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="order-1 md:order-2">
          <img
            src={link}
            alt="CeX About Us"
            className="rounded-3xl h-64 md:h-80 lg:h-96 object-cover"
          />
        </div>
      </div>
    </div>
  );
}
