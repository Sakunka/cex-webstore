import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import PriceFilter from "./PriceFilter";
import CheckoutInput from "./CheckoutInput";
import DirButton from "./DirButton";

export default function FilterItem({ category, register, categoryData }: any) {
  const [open, setOpen] = useState(false);
  return (
    <div key={category}>
      {category.toLowerCase() === "price" ? (
        <PriceFilter register={register} />
      ) : (
        <div className="border-t-1 border-gray-300 py-5">
          <DirButton setOpen={setOpen} open={open} category={category} />
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 100, opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-auto"
              >
                <CheckoutInput
                  register={register}
                  category={category}
                  categoryData={categoryData}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
