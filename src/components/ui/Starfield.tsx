import { useRef, useEffect } from 'react';

interface StarfieldProps {
  starCount?: number;
  starColor?: string;
  speedFactor?: number;
}

const Starfield = ({ 
  starCount = 500, 
  starColor = '#FFFFFF',
  speedFactor = 0.05 
}: StarfieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let stars: { x: number; y: number; z: number }[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width - canvas.width / 2,
          y: Math.random() * canvas.height - canvas.height / 2,
          z: Math.random() * canvas.width,
        });
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = starColor;
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      
      stars.forEach(star => {
        star.z -= speedFactor;
        if (star.z <= 0) {
          star.z = canvas.width;
        }

        const k = 128.0 / star.z;
        const px = star.x * k;
        const py = star.y * k;

        if (px >= -canvas.width/2 && px < canvas.width/2 && py >= -canvas.height/2 && py < canvas.height/2) {
          const size = (1 - star.z / canvas.width) * 2;
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    render();
    
    return () => {
      resizeObserver.unobserve(container);
      cancelAnimationFrame(animationFrameId);
    };
  }, [starCount, starColor, speedFactor]);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />;
};

export default Starfield;