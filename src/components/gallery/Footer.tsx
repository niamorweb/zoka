import Link from "next/link";
import { motion } from "framer-motion";

export default function footer() {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };
  return (
    <Link
      href="/"
      target="_blank"
      className="z-20 absolute top-3 right-3 h-fit w-fit "
    >
      <motion.div
        animate={{
          scale: [1, 1.02, 1], // Séquence de mises à l'échelle : normale, légèrement agrandie, normale
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="flex h-10 items-center px-4 rounded-full border text-black font-semibold border-white bg-white hover:border-black sm:h-12 "
      >
        Kuta - Create your page
      </motion.div>
    </Link>
  );
}
