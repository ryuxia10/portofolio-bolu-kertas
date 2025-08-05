import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import NewPortfolioSection from "@/components/NewPortfolioSection";
import FinalSection from "@/components/FinalSection";
import { AnimatePresence } from "framer-motion";
import Preloader from "@/components/Preloader";
import { useState } from "react";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence onExitComplete={() => setIsLoading(false)}>
        {isLoading && <Preloader onCompleted={() => setIsLoading(false)} />}
      </AnimatePresence>
      
      <HeroSection />
      <AboutSection />
      <NewPortfolioSection />
      <FinalSection />
    </>
  );
};

export default HomePage;