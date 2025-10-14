import { FaHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { type Types } from "mongoose";
import { useRouter } from "next/navigation";
import useFavourites from "@/hooks/useFavourites";
import Loader from "../ui/Loader";

type Game = {
  _id: Types.ObjectId;
  name: string;
  price: number;
  year: number;
  genre: string;
  publisher: string;
  pegi_rating: string;
  description: string;
  image: string;
};

type Computing = {
  _id: Types.ObjectId;
  type: string;
  ram: number;
  cpu: string;
  screen_size: string;
  storage: string;
  manufacturer: string;
  gpu: string;
  os: string;
  price: number;
  image: string;
};

type Phone = {
  _id: Types.ObjectId;
  name: string;
  price: number;
  OS: string;
  manufacturer: string;
  network: string;
  color: string;
  image: string;
};

type FavouriteItem = Game | Computing | Phone;

type Favourite = {
  _id: Types.ObjectId;
  user: string;
  itemId: Types.ObjectId;
  itemType: "game" | "computing" | "phone";
  item?: FavouriteItem;
};

export default function FavouriteTab() {
  const router = useRouter();
  const { items, loading, error, deleteFavourite } = useFavourites();

  async function handleDeleteFavourite(e: React.MouseEvent, id: string) {
    e.stopPropagation();
    await deleteFavourite(id);
  }

  if (loading) {
    return <Loader width={100} height={200} />;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">Error: {error}</div>;
  }

  return (
    <div>
      {items.length === 0 ? (
        <p className="text-center py-8 text-gray-600">No favourites found.</p>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item._id.toString()}
              onClick={() =>
                router.push(`/item/${item.itemType}/${item.itemId}`)
              }
              className="mb-10 flex flex-col justify-between relative p-6 w-62 h-94 bg-gray-50 rounded-3xl hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out group cursor-pointer"
            >
              <div
                onClick={(e) => {
                  handleDeleteFavourite(e, item._id);
                }}
                className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <FaHeart
                  size={20}
                  color="red"
                  className="text-gray-600 hover:text-red-500 transition-colors"
                />
              </div>

              <div className="flex justify-center items-center pt-4 pb-8 flex-1">
                <div className="w-30 h-50 rounded-2xl shadow-sm flex items-center justify-center p-4 ">
                  {item.item?.image ? (
                    <img
                      src={item.item.image}
                      alt={item.item?.name || "Item"}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="text-gray-400">No image</div>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 leading-tight truncate">
                  {item.item?.name || "Unknown Item"}
                </h3>

                <div className="flex justify-between items-center pt-2">
                  <p className="text-2xl font-bold text-gray-900">
                    £{item.item?.price?.toFixed(2) || "0.00"}
                  </p>
                  <button
                    onClick={(e) => {
                      addToBasket(e, item.itemId, item.itemType);
                    }}
                    className="w-12 h-12 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
                  >
                    <FiShoppingCart size={20} className="text-white" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
