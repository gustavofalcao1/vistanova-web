'use client';

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.h1
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
          className="text-7xl md:text-9xl font-extrabold text-primary mb-4"
        >
          <p className="text-shadow-lg">404</p>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-2xl md:text-3xl font-semibold mb-4"
        >
          Página não encontrada
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-lg md:text-xl text-muted-foreground mb-8 max-w-md mx-auto"
        >
          Não encontramos a página que procuravas... Mas não te preocupes, a VISTA NOVA tem sempre soluções para te ajudar a encontrar o caminho de volta!
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Link
            href="/"
            className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg hover:bg-secondary hover:text-primary transition-colors duration-300 shadow-lg"
          >
            Voltar para a página inicial
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
