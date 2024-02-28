import Link from "next/link";
import { motion } from "framer-motion";

export default function footer() {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };
  return (
    <div className="pb-10 lg:pb-8 pt-10 flex justify-center lg:pt-20 gap-6">
      <Link href="/" target="_blank" className="h-fit w-fit ">
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
          className="text-center mx-auto bg-greenDark font-medium text-greenLight border-2 border-greenLight hover:text-greenDark hover:bg-greenLight duration-300 rounded-3xl px-5 py-3"
        >
          <span>Kuta - Create your own page free here</span>
        </motion.div>
      </Link>
    </div>
  );
}
