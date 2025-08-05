import ScrollVelocity from "./ui/ScrollVelocity";
import "./ui/ScrollVelocity.css";

const VelocityBanner = () => {
  const line1 = ["Bolu Kertas"];
  const line2 = ["Excel · Word · PowerPoint · Photoshop · CorelDRAW"];

  return (
    <section className="py-20 overflow-hidden">
      <ScrollVelocity
        texts={line1}
        className="font-black text-6xl md:text-8xl text-[#FF6B6B] uppercase"
        velocity={50}
      />
      <div className="h-4" />
      <ScrollVelocity
        texts={line2}
        className="font-bold text-2xl md:text-4xl text-gray-700"
        velocity={-50}
      />
    </section>
  );
};

export default VelocityBanner;