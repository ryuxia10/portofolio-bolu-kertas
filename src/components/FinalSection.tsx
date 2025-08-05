import VelocityBanner from "./VelocityBanner";
import Footer from "./Footer";
import Starfield from "./ui/Starfield";

const FinalSection = () => {
  return (
    <section className="relative bg-[#FDF6E3]">
      <Starfield 
        starColor="#FF6B6B" 
        speedFactor={0.03} 
      />
      <div className="relative z-10">
        <VelocityBanner />
        <Footer />
      </div>
    </section>
  );
};

export default FinalSection;