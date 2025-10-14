export default function Recommendations() {
  const people = [
    {
      text: "The Franchise has certainly exceeded my expectations; I’ve really enjoyed working with the franchise team and have a brilliant and supportive franchise manager. He has helped me grow my business and backed me to open new locations. CeX feels like a big family and everyone is supportive towards each other and most importantly, they know how to have fun along the way!",
      name: "Jonny Barrow",
    },
    {
      text: "What separates CeX from wider buy and sell retailers is our execution. CeX trade in a focused, yet complementary product range, backed up by 33 years' experience. The brand is publicly acclaimed as a technology and entertainment specialist. We have developed a set of bespoke computer systems that simplify the process of buying and selling. Goods are tested before they are bought in and then resold with a 5-year warranty, offering customers great value for money and peace of mind.",
      name: "Gabriel Moreno",
    },
    {
      text: "The most enjoyable part of operating a CeX franchise for me has been the opportunity to motivate my staff and see them enjoy their work as much as I do himself. A CeX Franchise also affords me the freedom to do other tasks required elsewhere, as CeX’s powerful tools are available for me to keep track of performance even if I am not personally in-store.",
      name: "Huseyin Nurhakli",
    },
  ];
  return (
    <div>
      <h2 className="text-center font-bold text-2xl py-8">
        Loved by people just like you!
      </h2>
      <div className="flex flex-row gap-3 overflow-x-auto md:flex-nowrap flex-wrap">
        {people.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-5 justify-between rounded-3xl bg-white border-1 border-gray-200 w-full md:w-1/3 p-4 min-w-[280px]"
          >
            <p className="text-[15px]">"{item.text}"</p>
            <p className="font-bold">"{item.name}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}
