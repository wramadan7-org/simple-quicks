import { motion } from "framer-motion";

export default function TaskPopup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full flex max-w-1/3 max-h-3/4 bg-white text-black fixed right-8 bottom-26 z-50 rounded-md"
    >
      TaskPopup
    </motion.div>
  );
}
