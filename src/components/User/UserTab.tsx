import { useSelector } from "react-redux";
import Options from "./Options";
import { RootState } from "@/lib/store";

type UserTabProps = {
  setTab: (tab: string) => void;
  tab: string;
};

export default function UserTab({ setTab, tab }: UserTabProps) {
  const user = useSelector((state: RootState) => state.auth.user);

  const options = [
    { name: "Your Profile", function: true, value: "profile" },
    { name: "Your Purchases", function: true, value: "purchase" },
    { name: "Favourites", function: true, value: "favourite" },
    { name: "Logout!", function: true, value: "logout" },
  ];

  return (
    <div className="bg-white p-6 md:my-7 md:w-2/6 rounded shadow">
      <div className="mb-6">
        <div className="text-lg font-semibold mb-1">
          Hi,{" "}
          <span className="font-bold">
            {user?.firstName} {user?.lastName}
          </span>
        </div>
      </div>

      <ul className="space-y-3">
        {options.map((option, ind) => (
          <Options
            key={ind}
            value={option.value}
            name={option.name}
            function={option.function}
            isActive={tab === option.value}
            onClick={() => setTab(option.value)}
          />
        ))}
      </ul>
    </div>
  );
}
