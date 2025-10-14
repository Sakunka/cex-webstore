import React from "react";
import capitaliLetter from "@/constants/capitalLetter";
import { BsChevronDown } from "react-icons/bs";
import { motion } from "motion/react";

export default function DirButton({ setOpen, open, category }: any) {
  return (
    <div
      className="flex justify-between items-center cursor-pointer"
      onClick={() => setOpen((prev: boolean) => !prev)}
    >
      <h3 className="font-semibold">{capitaliLetter(category)}</h3>
      <motion.div
        animate={{ rotate: open ? 180 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <BsChevronDown className="w-4 h-4 text-gray-600" />
      </motion.div>
    </div>
  );
}
