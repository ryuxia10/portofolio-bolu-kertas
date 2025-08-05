import { useEffect, useRef, useId } from "react";
import { gsap } from "gsap";
import "./DecayCard.css";

interface DecayCardProps {
  width?: number;
  height?: number;
  image?: string;
  children?: React.ReactNode;
}

const DecayCard = ({
  width = 300,
  height = 400,
  image = "https://picsum.photos/300/400?grayscale",
  children,
}: DecayCardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const displacementMapRef = useRef<SVGFEDisplacementMapElement>(null);
  const filterId = useId();
  
  useEffect(() => {
    const cursor = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let cachedCursor = { ...cursor };
    let winsize = { width: window.innerWidth, height: window.innerHeight };

    const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;
    const map = (x: number, a: number, b: number, c: number, d: number) => (x - a) * (d - c) / (b - a) + c;
    const distance = (x1: number, x2: number, y1: number, y2: number) => Math.hypot(x1 - x2, y1 - y2);

    const handleResize = () => {
      winsize = { width: window.innerWidth, height: window.innerHeight };
    };

    const handleMouseMove = (ev: MouseEvent) => {
      cursor.x = ev.clientX;
      cursor.y = ev.clientY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    const imgValues = {
      imgTransforms: { x: 0, y: 0, rz: 0 },
      displacementScale: 0,
    };
    
    let animationFrameId: number;

    const render = () => {
      let targetX = lerp(imgValues.imgTransforms.x, map(cursor.x, 0, winsize.width, -40, 40), 0.1);
      let targetY = lerp(imgValues.imgTransforms.y, map(cursor.y, 0, winsize.height, -40, 40), 0.1);
      let targetRz = lerp(imgValues.imgTransforms.rz, map(cursor.x, 0, winsize.width, -10, 10), 0.1);

      imgValues.imgTransforms.x = targetX;
      imgValues.imgTransforms.y = targetY;
      imgValues.imgTransforms.rz = targetRz;

      if (containerRef.current) {
        gsap.set(containerRef.current, {
          x: imgValues.imgTransforms.x,
          y: imgValues.imgTransforms.y,
          rotateZ: imgValues.imgTransforms.rz,
        });
      }

      const cursorTravelledDistance = distance(cachedCursor.x, cursor.x, cachedCursor.y, cursor.y);
      imgValues.displacementScale = lerp(imgValues.displacementScale, map(cursorTravelledDistance, 0, 100, 0, 200), 0.1);
      
      if (displacementMapRef.current) {
        gsap.set(displacementMapRef.current, { attr: { scale: imgValues.displacementScale } });
      }

      cachedCursor = { ...cursor };
      animationFrameId = requestAnimationFrame(render);
    };
    
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [filterId]);

  return (
    <div
      className="content"
      style={{ width: `${width}px`, height: `${height}px` }}
      ref={containerRef}
    >
      <img
        src={image}
        alt=""
        className="w-full h-full object-cover"
        style={{ filter: `url(#${filterId})` }}
      />
      <svg className="hidden">
        <defs>
          <filter id={filterId}>
            <feTurbulence
              type="turbulence"
              baseFrequency="0.015"
              numOctaves="5"
              seed="4"
              stitchTiles="stitch"
              result="turbulence"
            />
            <feDisplacementMap
              ref={displacementMapRef}
              in="SourceGraphic"
              in2="turbulence"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="B"
            />
          </filter>
        </defs>
      </svg>
      <div className="card-text">{children}</div>
    </div>
  );
};

export default DecayCard;