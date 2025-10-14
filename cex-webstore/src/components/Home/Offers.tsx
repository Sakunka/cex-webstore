import ReviewSection from "./ReviewSection";
import SliderSection from "./SliderSection";

export default function Offers() {
  return (
    <div className="flex flex-col md:flex-row gap-3 mt-5">
      <SliderSection />
      <ReviewSection />
    </div>
  );
}
