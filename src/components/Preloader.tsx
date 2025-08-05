import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "./ui/CountUp";

interface PreloaderProps {
  onCompleted: () => void;
}

const Preloader = ({ onCompleted }: PreloaderProps) => {
  const [isCounting, setIsCounting] = useState(true);

  const handleCountUpEnd = () => {
    // Setelah hitungan selesai, tunggu sebentar lalu mulai animasi keluar
    setTimeout(() => {
      setIsCounting(false);
    }, 300);
  };

  return (
    <AnimatePresence onExitComplete={onCompleted}>
      {isCounting && (
        <motion.div
          exit={{ 
            y: "-110%",
            borderBottomLeftRadius: '50%',
            borderBottomRightRadius: '50%',
          }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1]}}
          className="fixed inset-0 bg-[#FDF6E3] z-50 flex justify-center items-center"
          style={{ filter: 'url(#gooey)' }}
        >
          <div className="text-[#FF6B6B] flex items-baseline font-black text-8xl md:text-9xl">
            <CountUp to={100} duration={2.5} onEnd={handleCountUpEnd} />
            <span>%</span>
          </div>

          <svg className="absolute w-0 h-0">
            <defs>
              <filter id="gooey">
                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                <feComposite in="SourceGraphic" in2="goo" operator="atop" />
              </filter>
            </defs>
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;