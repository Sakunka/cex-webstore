"use client";

import FavouriteTab from "@/components/User/FavouriteTab";
import Purchase from "@/components/Purchase/Purchase";
import UserInfo from "@/components/User/UserInfo";
import UserRightSide from "@/components/User/UserRightSide";
import UserTab from "@/components/User/UserTab";
import { useState } from "react";

type TabType = "profile" | "favourite" | "purchase";

const tabComponents: Record<TabType, React.ComponentType> = {
  profile: UserInfo,
  favourite: FavouriteTab,
  purchase: Purchase,
};

export default function User() {
  const [tab, setTab] = useState<TabType>("profile");
  const ActiveTab = tabComponents[tab];

  return (
    <div className="w-full md:flex md:gap-3">
      <UserTab setTab={setTab} tab={tab} />
      <UserRightSide>
        <ActiveTab />
      </UserRightSide>
    </div>
  );
}
