// Lokasi file: src/components/AboutSection.tsx

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Threads from "./ui/Threads";
import "./ui/Threads.css";
import { Mail, Phone } from "lucide-react";
import PixelTransition from "./ui/PixelTransition";
import StarButton from "./ui/StarButton";
import { PROFILE_DATA, SKILLS_DATA } from "@/data";

const AboutSection = () => {
  gsap.registerPlugin(ScrollTrigger);
  const container = useRef(null);
  const track = useRef(null);

  useGSAP(() => {
    gsap.to(track.current, {
      xPercent: -100 * (2 / 3),
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "+=2000",
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true
      }
    });
  }, { scope: container });

  const colors = ["bg-[#BDE0FE]", "bg-[#FFD1E3]", "bg-[#FFFACD]", "bg-[#A2D2FF]"];

  const renderSkill = (skill: { name: string; rating: number }, color: string) => (
    <PixelTransition
      key={skill.name}
      pixelColor="#FF6B6B"
      className={`${color} rounded-lg shadow-md cursor-pointer w-full !border-none`}
      aspectRatio="40%"
      firstContent={
        <div className="w-full h-full flex items-center justify-center p-2">
          <span className="font-bold text-white text-lg text-center [text-shadow:1px_1px_2px_rgba(0,0,0,0.4)]">{skill.name}</span>
        </div>
      }
      secondContent={
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-3xl">{'⭐'.repeat(skill.rating)}</span>
        </div>
      }
    />
  );

  return (
    <section ref={container} className="relative h-screen bg-[#FDF6E3]">
      <Threads 
        className="absolute inset-0 z-0" 
        color={[1.0, 0.42, 0.42]}
        enableMouseInteraction={true}
        amplitude={1}
      />
      <div ref={track} className="h-full w-[300vw] flex relative z-10">
        
        <div className="panel w-screen h-full flex flex-col justify-center items-center px-8 md:px-16 text-center">
          <h2 className="text-5xl md:text-7xl font-black text-gray-800 mb-4 tracking-tighter">{PROFILE_DATA.name}</h2>
          <p className="text-xl md:text-2xl font-bold text-gray-600 mb-2">Hobi: <span className="text-[#FF6B6B]">{PROFILE_DATA.hobby}</span></p>
          <p className="text-xl md:text-2xl font-bold text-gray-600">Motto: <span className="text-[#FF6B6B]">{PROFILE_DATA.motto}</span></p>
        </div>

        <div className="panel w-screen h-full flex flex-col justify-center items-center gap-y-8 px-4 md:px-16">
          <h2 className="text-5xl md:text-7xl font-black text-gray-800 tracking-tighter">Keahlian</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full max-w-4xl">
            <div className="flex flex-col items-center gap-3">
              <h3 className="font-bold text-xl text-gray-700">Perkantoran</h3>
              {SKILLS_DATA.office.map(skill => renderSkill(skill, colors[0]))}
            </div>
            <div className="flex flex-col items-center gap-3">
              <h3 className="font-bold text-xl text-gray-700">Desain</h3>
              {SKILLS_DATA.design.map(skill => renderSkill(skill, colors[1]))}
            </div>
            <div className="flex flex-col items-center gap-3">
              <h3 className="font-bold text-xl text-gray-700">Koding</h3>
              {SKILLS_DATA.coding.map(skill => renderSkill(skill, colors[2]))}
            </div>
            <div className="flex flex-col items-center gap-3">
              <h3 className="font-bold text-xl text-gray-700">Bahasa & Spiritual</h3>
              {SKILLS_DATA.languages.map(skill => renderSkill(skill, colors[3]))}
            </div>
          </div>
        </div>

        <div className="panel w-screen h-full flex flex-col justify-center items-center px-8 md:px-16 text-center">
          <h2 className="text-5xl md:text-7xl font-black text-gray-800 mb-4 tracking-tighter">Pekerjaan & Kontak</h2>
          <p className="text-2xl md:text-3xl font-bold text-white p-4 rounded-lg bg-[#FF6B6B] shadow-lg mb-8">{PROFILE_DATA.jobTitle}</p>
          <div className="flex flex-col md:flex-row gap-6">
            <StarButton href={PROFILE_DATA.contact.whatsapp}>
              <Phone className="text-green-500" /> 
              <span>{PROFILE_DATA.contact.whatsappDisplay}</span>
            </StarButton>
            <StarButton href={PROFILE_DATA.contact.email}>
              <Mail className="text-red-500" />
              <span>{PROFILE_DATA.contact.emailDisplay}</span>
            </StarButton>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;