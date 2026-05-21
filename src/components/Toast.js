import { motion } from "framer-motion";

export default function Toast({ message }) {
  if (!message) return null;

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed",
        bottom: 30,
        left: "50%",
        transform: "translateX(-50%)",
        background: "#111",
        color: "#fff",
        padding: "12px 18px",
        borderRadius: "999px",
        fontSize: "13px",
        zIndex: 9999,
      }}
    >
      {message}
    </motion.div>
  );
}