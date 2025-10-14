export default function Basic() {
  const award = "/images/franchises/award.svg";
  const franchised = "/images/franchises/franchised.svg";
  const hugePotential = "/images/franchises/huge-potential.svg";
  const recessionResistant = "/images/franchises/recession-resistant.svg";
  const storesUK = "/images/franchises/stores-uk.svg";
  const storesWorld = "/images/franchises/stores-world.svg";

  const franchises = [
    {
      text: "Award winners franchise",
      icon: award,
    },
    {
      text: "Proven franchised model",
      icon: franchised,
    },
    {
      text: "Huge growth potential",
      icon: hugePotential,
    },
    {
      text: "Recession resistant business",
      icon: recessionResistant,
    },
    {
      text: "150+ UK stores",
      icon: storesUK,
    },
    {
      text: "629+ stores worldwide",
      icon: storesWorld,
    },
  ];
  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-2xl font-bold text-center">
        CeX is the gadget lovers dream franchise that bress unrivalled returns
      </h2>
      <div className="flex flex-row gap-4">
        {franchises.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-4 rounded-lg"
          >
            <img src={item.icon} alt={item.text} className="w-16 h-16 mb-3" />
            <p className="text-sm font-semibold">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
