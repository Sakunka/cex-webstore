import { motion } from "motion/react";
import FormItems from "./FormItems";

export default function Form({ register }) {
  return (
    <>
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        exit={{ y: -70, opacity: 0 }}
        className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 space-y-5"
      >
        <FormItems register={register} />
      </motion.div>
    </>
  );
}
