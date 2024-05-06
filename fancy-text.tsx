"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface FancyTextProps {
  text: string;
  color: string;
}

const FancyText = ({ text, color }: FancyTextProps) => {
  const [scrollY, setScrollY] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);

  const yOffset = -scrollY / 2;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    return () => {
      // Clean up the event listener
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const wrappedText = text.split("").map((char, i) => (
    <motion.span
      initial={{ opacity: 0, color: "#EAB308" }}
      animate={{ opacity: 1, color: "#FFFFFF" }}
      whileHover={{ color: "#EAB308", scale: 1.02 }}
      transition={{
        delay: loading ? 1.25 + i * 0.025 : 0,
        duration: loading ? 0.1 : 0,
      }}
      key={i}
      className={`transition-all select-none`}
    >
      {char}
    </motion.span>
  ));

  return (
    <motion.div
    className="z-[9001]"
      initial={{ y: 10 }}
      animate={{ y: yOffset }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      {wrappedText}
    </motion.div>
  );
};

export default FancyText;
