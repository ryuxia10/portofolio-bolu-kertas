import { useState, useEffect } from "react";
import React from 'react';
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";

interface PortfolioDetailDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  item: {
    id: number;
    category: string;
    title: string;
    description: string;
    bgColor: string;
    details: {
      file: string;
      slides: {
        title: string;
        description:string;
        content: React.ReactNode;
      }[];
    };
  } | null;
}

const PortfolioDetailDialog: React.FC<PortfolioDetailDialogProps> = ({ isOpen, setIsOpen, item }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-3xl p-0 border-none 
        [&>button]:transition-transform [&>button]:duration-300 [&>button]:hover:rotate-90">
        <motion.div 
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.7, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className={`${item.bgColor} rounded-lg`}
        >
          <DialogHeader className="p-6 text-left">
            <DialogTitle className="text-3xl font-black text-gray-900">{item.title}</DialogTitle>
            <DialogDescription className="text-gray-700 text-lg">{item.description}</DialogDescription>
          </DialogHeader>
          <div className="px-6 pb-6">
            <Carousel setApi={setApi} className="w-full">
              <CarouselContent>
                {item.details.slides.map((slide, index) => (
                  <CarouselItem key={index} className="min-w-0 basis-full flex flex-col items-center justify-center text-center p-8 md:p-12 bg-white/50 rounded-md">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-[200px] h-[150px] bg-black/5 flex items-center justify-center rounded-lg mb-6">
                        {slide.content}
                      </div>
                      <div className="max-w-sm">
                        <h4 className="text-2xl font-bold text-gray-900">{slide.title}</h4>
                        <p className="text-gray-600 mt-2 break-words">{slide.description}</p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <div className="py-2 text-center text-sm text-gray-700 flex justify-center items-center gap-2 mt-4">
              {Array.from({ length: count }).map((_, index) => (
                <button 
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${current === index + 1 ? 'bg-gray-800 scale-125' : 'bg-gray-800/30'}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default PortfolioDetailDialog;