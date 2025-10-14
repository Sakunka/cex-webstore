import type { Types } from "mongoose";
import { BiStore } from "react-icons/bi";
import { BsBasket2 } from "react-icons/bs";
import { FiTruck } from "react-icons/fi";
import { IoMdCheckmark, IoMdCheckmarkCircleOutline } from "react-icons/io";
import { ImCross } from "react-icons/im";
import { addBasket } from "@/lib/api/addBasket";

export default function DetailsDown({
  id,
  count,
  type,
}: {
  id: Types.ObjectId;
  count?: number;
  type: string;
}) {
  return (
    <div className="mt-7 flex flex-col space-y-6 border-t-2 p-4">
      <div className="flex flex-col md:flex-row justify-between gap-3">
        <div className="flex flex-row gap-4 items-center">
          {count === 0 ? (
            <>
              <ImCross size={30} color="red" />
              <span className="text-red-500">Not in stock</span>
            </>
          ) : (
            <>
              <IoMdCheckmark size={30} />
              <span>In stock online</span>
            </>
          )}
        </div>
        <div className="flex flex-row gap-4 items-center">
          <FiTruck size={30} />
          <span>Delivery available</span>
        </div>
      </div>
      <div className="flex flex-row gap-4 items-center">
        <IoMdCheckmarkCircleOutline size={30} />
        <span>Free 5 Year Warranty</span>
      </div>
      <div className="flex flex-row gap-4 items-center">
        <BiStore size={30} />
        <span className="font-bold">Collect today, check store stock</span>
      </div>
      <div className="flex flex-row justify-center">
        <button
          onClick={() => addBasket(id, type)}
          disabled={count === 0 || count === undefined}
          className="bg-red-600 text-white w-3/5 rounded-4xl py-3 flex flex-row justify-center gap-4 items-center disabled:bg-gray-400 disabled:cursor-not-allowed hover:cursor-pointer"
        >
          <BsBasket2 /> Add to basket
        </button>
      </div>
    </div>
  );
}
