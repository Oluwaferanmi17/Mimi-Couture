"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { TouchEvent, WheelEvent } from "react";
// import Image from "next/image";
import { motion } from "framer-motion";

interface ScrollExpandMediaProps {
  mediaType?: "video" | "image";
  mediaSrc: string;
  posterSrc?: string;
  /** Image shown first; once scroll threshold is hit, transitions to video */
  previewImageSrc?: string;
  videoSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = "video",
  mediaSrc,
  posterSrc,
  previewImageSrc,
  videoSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  /** true once scroll crosses 50% — swaps the still image for the video */
  const [showVideo, setShowVideo] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false);
  const [touchStartY, setTouchStartY] = useState<number>(0);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // Reset state when mediaType changes
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
    setShowVideo(false);
  }, [mediaType]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollDelta = e.deltaY * 0.0009;
        const newProgress = Math.min(
          Math.max(scrollProgress + scrollDelta, 0),
          1,
        );
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }
        // Swap still image → video at 50% expansion
        if (newProgress >= 0.5) {
          setShowVideo(true);
        } else {
          setShowVideo(false);
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollFactor = deltaY < 0 ? 0.008 : 0.005;
        const scrollDelta = deltaY * scrollFactor;
        const newProgress = Math.min(
          Math.max(scrollProgress + scrollDelta, 0),
          1,
        );
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }
        // Swap still image → video at 50% on touch too
        if (newProgress >= 0.5) {
          setShowVideo(true);
        } else {
          setShowVideo(false);
        }

        setTouchStartY(touchY);
      }
    };

    const handleTouchEnd = (): void => {
      setTouchStartY(0);
    };

    const handleScroll = (): void => {
      if (!mediaFullyExpanded) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener("wheel", handleWheel as unknown as EventListener, {
      passive: false,
    });
    window.addEventListener("scroll", handleScroll as EventListener);
    window.addEventListener(
      "touchstart",
      handleTouchStart as unknown as EventListener,
      { passive: false },
    );
    window.addEventListener(
      "touchmove",
      handleTouchMove as unknown as EventListener,
      { passive: false },
    );
    window.addEventListener("touchend", handleTouchEnd as EventListener);

    return () => {
      window.removeEventListener(
        "wheel",
        handleWheel as unknown as EventListener,
      );
      window.removeEventListener("scroll", handleScroll as EventListener);
      window.removeEventListener(
        "touchstart",
        handleTouchStart as unknown as EventListener,
      );
      window.removeEventListener(
        "touchmove",
        handleTouchMove as unknown as EventListener,
      );
      window.removeEventListener("touchend", handleTouchEnd as EventListener);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY]);

  useEffect(() => {
    const checkIfMobile = (): void => {
      setIsMobileState(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const mediaWidth = 300 + scrollProgress * (isMobileState ? 650 : 1250);
  const mediaHeight = 400 + scrollProgress * (isMobileState ? 200 : 400);
  const textTranslateX = scrollProgress * (isMobileState ? 180 : 150);

  const firstWord = title ? title.split(" ")[0] : "";
  const restOfTitle = title ? title.split(" ").slice(1).join(" ") : "";

  return (
    <div
      ref={sectionRef}
      className="transition-colors duration-700 ease-in-out overflow-x-hidden"
    >
      <section className="relative flex flex-col items-center justify-start min-h-[100dvh]">
        <div className="relative w-full flex flex-col items-center min-h-[100dvh]">
          <motion.div
            className="absolute inset-0 z-0 h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 - scrollProgress }}
            transition={{ duration: 0.1 }}
          >
            <img
              src={bgImageSrc}
              alt="Background"
              width={1920}
              height={1080}
              className="w-screen h-screen"
              style={{ objectFit: "cover", objectPosition: "center" }}
              //   priority
            />
            <div className="absolute inset-0 bg-black/10" />
          </motion.div>

          <div className="container mx-auto flex flex-col items-center justify-start relative z-10">
            <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative">
              <div
                className="absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-none rounded-2xl"
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: "95vw",
                  maxHeight: "85vh",
                  boxShadow: "0px 0px 50px rgba(0, 0, 0, 0.3)",
                }}
              >
                {/* ── Layered image → video crossfade ── */}
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  {/* Layer 1: still preview image (always mounted, fades out) */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{ opacity: showVideo ? 0 : 1 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  >
                    <img
                      src={
                        mediaType === "video"
                          ? previewImageSrc || posterSrc || bgImageSrc
                          : mediaSrc
                      }
                      alt={title || "Preview"}
                      width={1280}
                      height={720}
                      className="w-full h-full object-cover"
                      //   priority
                    />
                  </motion.div>

                  {/* Layer 2: video (fades in at 50% scroll) */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    animate={{ opacity: showVideo ? 1 : 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  >
                    <video
                      ref={videoRef}
                      src={videoSrc || mediaSrc}
                      poster={posterSrc || previewImageSrc}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Shared dark overlay that lifts as you scroll */}
                  <motion.div
                    className="absolute inset-0 bg-black/50 pointer-events-none"
                    animate={{ opacity: 0.6 - scrollProgress * 0.4 }}
                    transition={{ duration: 0.2 }}
                  />
                </div>

                <div className="flex flex-col items-center text-center relative z-10 mt-4 transition-none">
                  {date && (
                    <p
                      className="text-2xl text-amber-200 tracking-[0.3em] uppercase font-light"
                      style={{ transform: `translateX(-${textTranslateX}vw)` }}
                    >
                      {date}
                    </p>
                  )}
                  {scrollToExpand && (
                    <p
                      className="text-amber-200/70 font-light text-sm tracking-widest uppercase text-center mt-2"
                      style={{ transform: `translateX(${textTranslateX}vw)` }}
                    >
                      {scrollToExpand}
                    </p>
                  )}
                </div>
              </div>

              <div
                className={`flex items-center justify-center text-center gap-4 w-full relative z-10 transition-none flex-col ${
                  textBlend ? "mix-blend-difference" : "mix-blend-normal"
                }`}
              >
                <motion.h2
                  className="text-5xl md:text-7xl lg:text-8xl font-bold text-amber-50 transition-none"
                  style={{
                    transform: `translateX(-${textTranslateX}vw)`,
                    fontFamily: "'Cormorant Garamond', serif",
                    letterSpacing: "0.05em",
                  }}
                >
                  {firstWord}
                </motion.h2>
                <motion.h2
                  className="text-5xl md:text-7xl lg:text-8xl font-bold text-center text-amber-50 transition-none"
                  style={{
                    transform: `translateX(${textTranslateX}vw)`,
                    fontFamily: "'Cormorant Garamond', serif",
                    letterSpacing: "0.05em",
                  }}
                >
                  {restOfTitle}
                </motion.h2>
              </div>
            </div>

            <motion.section
              className="flex flex-col w-full px-8 py-10 md:px-16 lg:py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.7 }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
