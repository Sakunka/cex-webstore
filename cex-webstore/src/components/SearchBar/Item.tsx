import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import { FaAnglesRight } from "react-icons/fa6";

export default function Item({ item, setOpen }) {
  const router = useRouter();
  return (
    <li
      onClick={() => {
        router.push(`/item/${item.type}/${item.id}`);
        setOpen(false);
      }}
      className="border-b-2 pb-2 hover:bg-gray-200"
    >
      <div className="flex flex-row items-center pl-3 pt-3">
        <FaSearch />
        <span className="text-[18px] pl-3 items-center font-semibold">
          {item.name}
        </span>
      </div>
      <div className="flex flex-row items-center ml-8 gap-3">
        <FaAnglesRight />
        {item.type}
      </div>
    </li>
  );
}
