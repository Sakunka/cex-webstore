"use client";

import { VscAccount } from "react-icons/vsc";
import { BsBasket } from "react-icons/bs";
import { CiMenuFries } from "react-icons/ci";
import { useEffect, useState, useRef, useCallback } from "react";
import { AnimatePresence } from "motion/react";
import { useSelector } from "react-redux";
import type { RootState } from "@/lib/store";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useSearch } from "../../components/SearchBar/useSearch";
import Modal from "../ui/Modal";
import { useRouter } from "next/navigation";
import SideMenu from "./SideMenu";
import AccountDropdown from "./AccountDropdown";
import NavSelection from "./NavSelection";

export default function Header() {
  const { searchTerm, setSearchTerm, results } = useSearch();
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const user = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  const handleMenu = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const handleSignInModal = useCallback(() => {
    if (user.loggedIn) {
      setShowAccountDropdown((prev) => !prev);
      setModal(false);
    } else {
      setModal((prev) => !prev);
      setShowAccountDropdown(false);
    }
  }, [user.loggedIn]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowAccountDropdown(false);
      }
    }

    if (showAccountDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAccountDropdown]);

  return (
    <header className="bg-[#e80c04] w-full">
      <AnimatePresence>
        {open && <SideMenu setOpen={setOpen} />}
      </AnimatePresence>

      <div className="flex flex-row justify-between items-center gap-3 md:gap-7 md:justify-center text-white p-5">
        <div
          onClick={() => handleMenu()}
          className="flex flex-col justify-center items-center gap-1 cursor-pointer"
        >
          <CiMenuFries color="white" size="1.6em" />
          <span className="text-xs md:text-base">Menu</span>
        </div>

        <img
          src="/images/logo.svg"
          width="70px"
          alt="Logo"
          className="w-12 md:w-16"
        />

        <div className="hidden md:block relative group md:w-4/7">
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            results={results}
          />
        </div>

        <div
          ref={dropdownRef}
          onClick={() => handleSignInModal()}
          className="relative flex flex-col justify-center items-center gap-1 cursor-pointer"
        >
          <VscAccount color="white" size="1.6em" />
          <span className="text-xs md:text-base">
            {user.loggedIn ? "Account" : "Sign In"}
          </span>
          {showAccountDropdown && user.loggedIn && (
            <div className="absolute top-full mt-2 right-0 z-50">
              <AccountDropdown
                setShowAccountDropdown={setShowAccountDropdown}
              />
            </div>
          )}
        </div>

        <div
          onClick={() => router.push("/basket")}
          className="flex flex-col justify-center items-center gap-1 cursor-pointer"
        >
          <BsBasket color="white" size="1.6em" />
          <span className="text-xs md:text-base">Basket</span>
        </div>
      </div>

      <div className="md:hidden px-5 pb-4">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          results={results}
        />
      </div>

      <NavSelection />

      <AnimatePresence>
        {modal && <Modal key="modal" setModal={setModal} />}
      </AnimatePresence>
    </header>
  );
}
