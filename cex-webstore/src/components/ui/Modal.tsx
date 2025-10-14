import { useEffect } from "react";
import { motion } from "motion/react";
import LoginSection from "../Auth/LoginSection";

type ModalProps = {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Modal({ setModal }: ModalProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60">
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 0 }}
        className="bg-white w-[600px] max-w-[90vw] rounded-2xl shadow-xl px-8 py-8 flex flex-col space-x-5"
      >
        <div className="flex flex-row justify-between mb-6">
          <p className="text-3xl font-bold">Sign Up</p>
          <span onClick={() => setModal((prev) => !prev)} className="text-3xl">
            X
          </span>
        </div>
        <LoginSection setModal={setModal} />
      </motion.div>
    </div>
  );
}
