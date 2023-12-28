"use client";

import { useState } from "react";
import { RiKnifeFill } from "react-icons/ri";
import { motion } from "framer-motion";

export default function DifficultyInput() {
  const [hoverValue, setHoverValue] = useState(0);

  const handleMouseEnter = (index: number) => {
    setHoverValue(index);
  };

  const handleMouseLeave = () => {
    setHoverValue(0);
  };

  function handleClick(index: number): void {
    switch (index) {
      case 1:
        // Handle case when index is 1
        break;
      case 2:
        // Handle case when index is 2
        break;
      case 3:
        // Handle case when index is 3
        break;
      case 4:
        // Handle case when index is 4
        break;
      default:
        // Handle other cases
        break;
    }
  }
  return (
    <>
      <ul className="flex gap-1 p-2" onMouseLeave={handleMouseLeave}>
        {[1, 2, 3, 4].map((index) => (
          <motion.li
            key={index}
            onMouseEnter={() => handleMouseEnter(index)}
            onClick={() => handleClick(index)}
            whileHover={{
              scale: 1.2,
              rotate: 30,
              transition: { duration: 0.5 },
            }}
            exit={{ scale: 1, rotate: 0, transition: { duration: 0.5 } }}
          >
            <RiKnifeFill
              className={
                index <= hoverValue
                  ? hoverValue <= 2
                    ? "text-green-500"
                    : hoverValue <= 3
                      ? "text-yellow-500"
                      : "text-red-500"
                  : ""
              }
              size={20}
            />
          </motion.li>
        ))}
      </ul>
    </>
  );
}
