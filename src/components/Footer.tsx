import { Github, Instagram, Linkedin, ArrowUpCircle } from "lucide-react";

const Footer = () => {
  const handleScrollToTop = () => {
    (window as any).lenis?.scrollTo(0, { duration: 2.5, ease: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
  };

  const socialLinks = [
    { icon: <Github />, url: "#" },
    { icon: <Linkedin />, url: "#" },
    { icon: <Instagram />, url: "#" },
  ];

  return (
    <footer className="text-gray-700 py-6 px-8 md:px-16">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          {socialLinks.map((link, index) => (
            <a 
              key={index} 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[#FF6B6B] transition-colors"
            >
              {link.icon}
            </a>
          ))}
        </div>

        <p className="font-bold text-sm md:text-base">
          © {new Date().getFullYear()} Bolu Kertas. Dirakit dengan semangat.
        </p>

        <button 
          onClick={handleScrollToTop} 
          className="group flex items-center gap-2 font-bold hover:text-[#FF6B6B] transition-colors"
        >
          Kembali ke Atas
          <ArrowUpCircle className="group-hover:animate-bounce" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;