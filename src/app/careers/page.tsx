"use client";

import Countries from "@/components/Careers/Countries";
import Stats from "@/components/Careers/Stats";
import Work from "@/components/Careers/Work";
import React from "react";
import { AnimatePresence, motion } from "motion/react";

export default function Careers() {
  return (
    <div>
      <motion.div className="flex flex-row gap-10 items-center justify-center text-center border-2 w-2/4 mx-auto rounded-4xl my-10">
        <Stats />
      </motion.div>
      <div className="text-center my-10">
        <h1 className="text-3xl font-bold">Why Work at CeX?</h1>
        <h2 className="text-2xl font-semibold">
          CeX is an equal opportunities employer full of growth, rewards and
          recognition
        </h2>
      </div>
      <Work />
      <Countries />
    </div>
  );
}
