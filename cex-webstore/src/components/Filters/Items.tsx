import Item from "../ui/Item";
import Loader from "../ui/Loader";

export default function Items({ data, loading, type }: any) {
  if (loading) {
    return (
      <div className="flex justify-center items-center w-full min-h-[400px]">
        <Loader width={60} height={60} />
      </div>
    );
  }

  const items = data?.items || [];

  if (items.length === 0) {
    return (
      <div className="flex justify-center items-center w-full min-h-[400px]">
        <Loader width={60} height={60} />
      </div>
    );
  }

  return (
    <div className="flex-1 w-full">
      <div className="grid gap-4 sm:gap-5 md:gap-6 px-4 py-6 sm:px-6 md:px-8 grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item: any, index: number) => (
          <Item key={item.id || index} item={item} type={type} />
        ))}
      </div>
    </div>
  );
}
