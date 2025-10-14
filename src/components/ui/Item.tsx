import { FiShoppingCart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa6";
import type { Types } from "mongoose";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { addFavourite } from "@/lib/api/addFavourite";
import { addBasket } from "@/lib/api/addBasket";

interface GameItem {
  _id: Types.ObjectId;
  name: string;
  price: number;
  year: number;
  description: string;
  pegi_rating: string;
  image: string;
  publisher: string;
}

interface ItemProps {
  item: GameItem;
  type: string;
}

export default function Item({ item, type }: ItemProps) {
  const router = useRouter();

  const handleFavouriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await addFavourite(item._id, type);
    } catch (error) {
      throw error;
    }
  };

  const handleAddToBasket = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await addBasket(item._id, type);
    } catch (error) {
      throw error;
    }
  };

  const handleItemClick = () => {
    router.push(`/item/${type}/${item._id}`);
  };

  return (
    <div
      onClick={handleItemClick}
      className="flex flex-col justify-between relative p-4 sm:p-6 w-full h-auto min-h-[320px] sm:min-h-[380px] bg-gray-50 rounded-2xl sm:rounded-3xl hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer group"
    >
      <button
        onClick={handleFavouriteClick}
        className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors z-10"
        aria-label="Add to favourites"
      >
        <FaHeart
          size={16}
          className="sm:w-5 sm:h-5 text-gray-600 hover:text-red-500 transition-colors"
        />
      </button>

      <div className="relative w-full h-[180px] sm:h-[220px]">
        <Image
          src={item?.image}
          alt={item?.name ?? `${type} item`}
          fill
          sizes="(max-width: 768px) 180px, 220px"
          className="object-contain"
          priority
        />
      </div>

      <div className="space-y-2 sm:space-y-3">
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 leading-tight line-clamp-2">
          {item.name}
        </h3>

        <div className="flex justify-between items-center pt-1 sm:pt-2">
          <p className="text-lg sm:text-xl font-bold text-gray-900">
            £{item.price.toFixed(2)}
          </p>
          <button
            onClick={handleAddToBasket}
            className="w-9 h-9 sm:w-10 sm:h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 active:scale-95"
            aria-label="Add to basket"
          >
            <FiShoppingCart
              size={16}
              className="sm:w-[18px] sm:h-[18px] text-white"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
