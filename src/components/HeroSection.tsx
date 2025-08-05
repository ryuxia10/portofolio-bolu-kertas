// Lokasi file: src/components/HeroSection.tsx

import { Button } from "@/components/ui/button";
import DotGrid from "./ui/DotGrid";
import DecayCard from "./ui/DecayCard";
import "./ui/DecayCard.css";
import { PROFILE_DATA } from "@/data";

const HeroSection = () => {
  const handleScrollToGallery = () => {
    (window as any).lenis?.scrollTo('#gallery-section', {
      duration: 2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#FDF6E3]">
      <div className="absolute inset-0 grid grid-cols-2 items-center z-10">
        <div className="flex flex-col justify-center pl-24 space-y-4">
          <h1 className="text-6xl md:text-7xl font-black text-gray-800 tracking-tighter">
            {PROFILE_DATA.name}
          </h1>
          <h2 className="text-xl md:text-2xl font-bold text-[#FF6B6B]">
            {PROFILE_DATA.jobTitle}
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-md">
            {PROFILE_DATA.heroDescription}
          </p>
          <Button 
            onClick={handleScrollToGallery}
            size="lg" 
            className="text-lg font-bold bg-[#FF6B6B] hover:bg-[#ff4f4f] text-white rounded-lg shadow-md transition-transform duration-200 hover:scale-105 !mt-6"
          >
            Lihat Materi Ajar
          </Button>
        </div>
        <div className="flex justify-center items-center">
          <DecayCard image="/images/01.jpg" width={300} height={400} />
        </div>
      </div>
      <DotGrid
        className="absolute inset-0 z-0"
        dotSize={8}
        gap={25}
        baseColor="#D1D5DB"
        activeColor="#FF6B6B"
        proximity={100}
        speedTrigger={200}
      />
    </div>
  );
};

export default HeroSection;