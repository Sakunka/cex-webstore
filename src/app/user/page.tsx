"use client";

import UserRightSide from "@/components/User/UserRightSide";
import UserTab from "@/components/User/UserTab";
import { useState } from "react";
import dynamic from "next/dynamic";

const FavouriteTab = dynamic(() => import("@/components/User/FavouriteTab"));
const Purchase = dynamic(() => import("@/components/Purchase/Purchase"));
const UserInfo = dynamic(() => import("@/components/User/UserInfo"));

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
