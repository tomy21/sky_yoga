// components/ui/modal/LoadingModal.tsx
import React from "react";
import { motion } from "framer-motion";
import { Spinner } from "./Spinner";

export default function LoadingModal() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col items-center justify-center gap-4 p-6 bg-white rounded-2xl shadow-lg dark:bg-gray-900"
      >
        <Spinner className="w-10 h-10 text-brand-500" />
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Signing you in...</p>
      </motion.div>
    </div>
  );
}
