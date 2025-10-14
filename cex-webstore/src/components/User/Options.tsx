import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/lib/store";
import { logoutUser } from "@/lib/features/auth/authSlice";

type Option = {
  name: string;
  value: string;
  function: boolean;
  onClick?: () => void;
  isActive?: boolean;
};

export default function Options({
  name,
  value,
  function: isFunction,
  onClick,
  isActive,
}: Option) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  return (
    <li
      onClick={
        value === "logout"
          ? () => {
              dispatch(logoutUser());
              router.push("/");
            }
          : onClick
      }
      className={`flex justify-between items-center cursor-pointer px-4 py-2 rounded hover:bg-gray-100 ${
        isActive ? "bg-blue-100 font-semibold" : ""
      }`}
    >
      {name}
      <svg
        className="h-5 w-5 text-gray-500 md:hidden"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </li>
  );
}
