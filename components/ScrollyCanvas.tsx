"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent, motion, useTransform } from "framer-motion";
import { Overlay } from "./Overlay";

const FRAME_COUNT = 192;
const FRAME_PREFIX = "frame_";
const FRAME_SUFFIX = "_delay-0.04s.png";

export function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0); // Always start at top
    
    const preloadImages = Array.from({ length: FRAME_COUNT }, (_, i) => {
      const img = new Image();
      const numStr = i.toString().padStart(3, "0");
      img.src = `/sequence/${FRAME_PREFIX}${numStr}${FRAME_SUFFIX}`;

      if (i === 0) {
        img.onload = () => setIsLoaded(true);
        img.onerror = () => setIsLoaded(true); 
      }
      return img;
    });
    
    setImages(preloadImages);
    const fallback = setTimeout(() => setIsLoaded(true), 1500);
    return () => clearTimeout(fallback);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    if (isLoaded && images.length > 0 && canvasRef.current) {
      renderFrame(0);
    }
  }, [isLoaded, images]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isLoaded || images.length === 0) return;
    
    // Sequence must begin AFTER the landing scroll (gate opening) is done
    let sequenceProgress = 0;
    if (latest > 0.05) {
      sequenceProgress = (latest - 0.05) / 0.95;
    }
    
    let frameIndex = Math.floor(sequenceProgress * (FRAME_COUNT - 1));
    frameIndex = Math.max(0, Math.min(FRAME_COUNT - 1, frameIndex));
    renderFrame(frameIndex);
  });

  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = images[index];
    if (!img) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const canvasRatio = rect.width / rect.height;
    const imgRatio = img.width / img.height;

    let renderWidth = rect.width;
    let renderHeight = rect.height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      renderHeight = rect.width / imgRatio;
      offsetY = (rect.height - renderHeight) / 2;
    } else {
      renderWidth = rect.height * imgRatio;
      offsetX = (rect.width - renderWidth) / 2;
    }

    ctx.clearRect(0, 0, rect.width, rect.height);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
  };

  useEffect(() => {
    const handleResize = () => {
      const currentProgress = scrollYProgress.get();
      const frameIndex = Math.floor(currentProgress * (FRAME_COUNT - 1));
      renderFrame(Math.max(0, Math.min(FRAME_COUNT - 1, frameIndex)));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [scrollYProgress, isLoaded, images]);

  // SROLL-DRIVEN GATE PHYSICS [0 to 0.05]
  const topGateY = useTransform(scrollYProgress, [0, 0.05], ["0%", "-100%"]);
  const bottomGateY = useTransform(scrollYProgress, [0, 0.05], ["0%", "100%"]);
  const gateOpacity = useTransform(scrollYProgress, [0.04, 0.06], [1, 0]);
  const pointerEventsGate = useTransform(scrollYProgress, [0.05, 0.06], ["auto", "none"]);
  
  const titleOpacity = useTransform(scrollYProgress, [0, 0.02, 0.05], [1, 0, 0]);
  const titleScale = useTransform(scrollYProgress, [0, 0.02], [1, 0.95]);
  const titleFilter = useTransform(scrollYProgress, [0, 0.02], ["blur(0px)", "blur(20px)"]);
  
  const slitOpacity = useTransform(scrollYProgress, [0, 0.02, 0.04, 0.06, 0.95, 0.97, 1.0], [1, 1, 0, 0, 0, 1, 1]);
  const slitScaleY = useTransform(scrollYProgress, [0, 0.02, 0.05, 0.95, 0.97, 1.0], [1, 1, 150, 0, 150, 150]);
  const slitScaleX = useTransform(scrollYProgress, [0, 0.02, 0.05, 0.95, 0.97, 1.0], [1, 1, 2, 0, 2, 2]);
  const slitFilter = useTransform(scrollYProgress, [0, 0.02, 0.05, 0.95, 0.97], ["blur(0px)", "blur(10px)", "blur(30px)", "blur(0px)", "blur(30px)"]);
  const slitColor = useTransform(scrollYProgress, [0, 0.02, 0.05], ["rgba(255,255,255,0.5)", "rgba(255,255,255,1)", "rgba(255,255,255,1)"]);
  
  return (
    // INCREASING HEIGHT TO 2500VH TO STRETCH THE 192 FRAMES OUT MAJESTICALLY
    <div ref={containerRef} className="relative w-full" style={{ position: "relative", height: "2500vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0a0a0a]">
        
        {/* Pure Scroll-Driven Cinematic Entrance */}
        <motion.div 
          style={{ opacity: gateOpacity, pointerEvents: pointerEventsGate as any }} 
          className="absolute inset-0 z-[100] flex flex-col"
        >
          {/* TOP GATE PANEL */}
          <motion.div 
            style={{ y: topGateY }}
            className="relative w-full h-1/2 bg-gradient-to-b from-black via-black to-[#0a0a0a] border-b border-white/20 shadow-[0_10px_50px_rgba(0,0,0,0.8)] flex flex-col justify-end items-center pointer-events-auto"
          >
             <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          </motion.div>
          
          {/* BOTTOM GATE PANEL */}
          <motion.div 
            style={{ y: bottomGateY }}
            className="relative w-full h-1/2 bg-gradient-to-t from-black via-black to-[#0a0a0a] border-t border-white/20 shadow-[0_-10px_50px_rgba(0,0,0,0.8)] flex flex-col justify-start items-center pointer-events-auto"
          >
             <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          </motion.div>

          {/* PERFECTLY CENTERED TITLE TEXT - Fades on initial scroll, HARD ERASED after 10% */}
          <motion.div
            style={{ opacity: titleOpacity, scale: titleScale, filter: titleFilter, display: useTransform(scrollYProgress, (v) => v > 0.1 ? "none" : "flex") }}
            className="absolute inset-0 flex flex-col items-center justify-center z-[105] pointer-events-none"
          >
              <h1 className="font-serif text-[clamp(4rem,10vw,8rem)] font-bold tracking-tighter text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] text-center leading-none">
                Yash Koparde
              </h1>
              <p className="font-sans text-[clamp(0.8rem,2vw,1.2rem)] font-medium text-white/50 uppercase tracking-[0.5em] mt-6">
                Creative Developer
              </p>
              {!isLoaded && (
                <p className="font-sans text-[0.6rem] font-medium text-white/30 uppercase tracking-[0.3em] mt-12 animate-pulse">
                  Awaiting Sequence...
                </p>
              )}
              {isLoaded && (
                <p className="font-sans text-[0.6rem] font-medium text-white/60 uppercase tracking-[0.3em] mt-12 animate-bounce">
                  Scroll To Enter
                </p>
              )}
          </motion.div>

          {/* Scroll-Driven Light Explosion */}
          <motion.div 
            style={{ 
              opacity: slitOpacity, 
              scaleY: slitScaleY, 
              scaleX: slitScaleX, 
              filter: slitFilter,
              backgroundColor: slitColor
            }}
            className="absolute top-1/2 left-0 right-0 h-[2px] mx-auto w-1/2 shadow-[0_0_30px_rgba(255,255,255,1),_0_0_60px_rgba(255,255,255,0.5)] z-[110] mix-blend-screen pointer-events-none origin-center" 
          />
        </motion.div>

        <motion.canvas
          ref={canvasRef}
          className="h-full w-full object-cover"
        />

        {/* Cinematic Scroll Map Bar */}
        <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 h-[30vh] w-[2px] bg-white/10 rounded-full z-50 mix-blend-plus-lighter hidden md:block">
          <motion.div 
            className="w-full bg-white rounded-full origin-top"
            style={{ scaleY: scrollYProgress, height: "100%" }}
          />
        </div>
        
        {/* Render the Parallax Overlay securely over the Canvas */}
        <Overlay scrollYProgress={scrollYProgress} />
      </div>
    </div>
  );
}
