type SliderItem = {
  image: string;
  text: string;
};

export default function SliderImage({ item }: { item: SliderItem }) {
  return (
    <div className="relative w-full h-80 overflow-hidden rounded-lg">
      <img
        src={item.image}
        alt={item.text || "Slider image"}
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
      />
      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-white text-4xl font-bold z-10 drop-shadow-lg">
        {item.text}
      </span>
    </div>
  );
}
