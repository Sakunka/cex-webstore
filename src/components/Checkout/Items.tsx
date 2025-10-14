import { motion } from "motion/react";

export default function Items({ items }: any) {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      exit={{ y: -20 }}
    >
      {items?.map((item: any) => (
        <p>
          {item?.itemId.name} x {item.amount}
        </p>
      ))}
    </motion.div>
  );
}
