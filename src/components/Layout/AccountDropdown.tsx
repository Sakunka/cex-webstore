import { RiAccountCircleLine } from "react-icons/ri";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/lib/store";
import { logoutUser } from "@/lib/features/auth/authSlice";
import { useRouter } from "next/navigation";

type AccountDropdownProps = {
  setShowAccountDropdown: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AccountDropdown({
  setShowAccountDropdown,
}: AccountDropdownProps) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const options = [
    { title: "Manage Profile", icon: <RiAccountCircleLine /> },
    { title: "Logout", icon: <IoLogOutOutline /> },
  ];

  const handleItemClick = (title: string) => {
    switch (title) {
      case "Logout":
        dispatch(logoutUser());
        router.push("/");
        setShowAccountDropdown(false);
        break;
      case "Manage Profile":
        router.push("/user");
        setShowAccountDropdown(false);
        break;
      default:
        setShowAccountDropdown(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[200px]">
      {options.map((item, ind) => (
        <div
          key={ind}
          className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors ${
            item.title === "Logout"
              ? "border-t border-gray-200 text-red-600"
              : "text-gray-700"
          }`}
          onClick={() => handleItemClick(item.title)}
        >
          <span
            className={`text-lg ${
              item.title === "Logout" ? "text-red-600" : "text-gray-600"
            }`}
          >
            {item.icon}
          </span>
          <span className="text-sm font-medium">{item.title}</span>
        </div>
      ))}
    </div>
  );
}
