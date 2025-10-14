import Offers from "../components/Home/Offers";
import PopularGames from "../components/Home/PopularGames";
import PopularPhones from "../components/Home/PopularPhones";
import PopularComputing from "../components/Home/PopularComputing";
import PopularMedia from "@/components/Home/PopularMedia";

export default function Home() {
  return (
    <>
      <Offers />
      <PopularGames />
      <PopularPhones />
      <PopularComputing />
      <PopularMedia />
    </>
  );
}
