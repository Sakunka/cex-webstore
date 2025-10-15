import { addFavourite } from "@/lib/api/addFavourite";

export default function DetailsUp({ item }) {
  return (
    <>
      <h2 className="text-2xl md:text-4xl font-bold">{item?.name}</h2>
      <div className="flex items-center justify-between">
        <p className="text-2xl md:text-4xl font-bold">
          £{item?.price.toFixed(2)}
        </p>
        <button
          className="bg-white text-black rounded-3xl border-2 border-black h-10 w-36 disabled:opacity-50 hover:bg-black hover:text-white hover:cursor-pointer transform transition duration-200"
          onClick={() => addFavourite(item?._id, item?.type)}
        >
          Add to Favourite
        </button>
      </div>
    </>
  );
}
