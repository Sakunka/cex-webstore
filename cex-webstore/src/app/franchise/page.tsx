import About from "@/components/Franchise/About";
import Awards from "@/components/Franchise/Awards";
import Basic from "@/components/Franchise/Basic";
import Package from "@/components/Franchise/Package";
import Recommendations from "@/components/Franchise/Recommendations";

export default function Franchise() {
  return (
    <div className="py-8">
      <Basic />
      <About />
      <Package />
      <Recommendations />
      <Awards />
    </div>
  );
}
