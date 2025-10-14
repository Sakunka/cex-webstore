import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type SetOpen = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SideMenu({ setOpen }: SetOpen) {
  function handleClick() {
    setOpen((prev: boolean) => !prev);
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  function handleRoute(route: string) {
    router.push(`/${route}`);
    setOpen(false);
  }

  const router = useRouter();

  return (
    <div className="fixed inset-0 z-[10000] bg-black/60">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.2 }}
        className="p-10 fixed z-[100] w-[250px] md:w-[370px] bg-white min-h-screen rounded-tr-4xl rounded-br-4xl shadow-lg "
      >
        <div className="flex flex-row justify-between pb-6 border-b border-gray-300 text-2xl">
          <p>Menu</p>
          <span onClick={handleClick} className="cursor-pointer select-none">
            X
          </span>
        </div>

        <div className="py-6 border-b border-gray-300">
          <ul className="flex flex-col gap-3">
            <li onClick={() => handleRoute("gaming")}>Gaming</li>
            <li onClick={() => handleRoute("phones")}>Phones</li>
            <li onClick={() => handleRoute("computing")}>Computing</li>
            <li onClick={() => handleRoute("media")}>Media</li>
          </ul>
        </div>

        <div className="py-6">
          <ul className="flex flex-col gap-3">
            <li>Support</li>
            <li>Careers</li>
            <li onClick={() => handleRoute("franchise")}>Franchising</li>
            <li>Repairs</li>
            <li>About CeX</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
