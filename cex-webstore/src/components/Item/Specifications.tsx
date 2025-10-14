import capitaliLetter from "@/constants/capitalLetter";
import { motion } from "motion/react";

export default function Specifications({ item }) {
  const noInclude = ["_id", "__v", "image", "in_stock", "id"];

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="mt-4 space-y-2 text-gray-700 dark:text-gray-300"
    >
      {Object.keys(item)
        .filter((key) => !noInclude.includes(key))
        .map((key) => (
          <div key={key} className="flex flex-row">
            <p className="font-bold pr-2">{capitaliLetter(key)}:</p>
            <p> {item[key]}</p>
          </div>
        ))}
    </motion.div>
  );
}
