import About from "@/components/Franchise/About";
import Basic from "@/components/Franchise/Basic";
import Package from "@/components/Franchise/Package";
import Recommendations from "@/components/Franchise/Recommendations";
import dynamic from "next/dynamic";

const Awards = dynamic(() => import("@/components/Franchise/Awards"));

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
