"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";

const ASSETS = {
  bgBlue: "/images/landing/BG Blue.png",
  handPhone: "/images/landing/Holding handphone.png",
  undanganTextImg: "/images/landing/Undangan.png",
  digitalTextImg: "/images/landing/Digital.png",
  sliderImages: [
    "/images/slider/slide1.png",
    "/images/slider/slide2.png",
    "/images/slider/slide3.png",
  ],
  userAvatars: [
    "https://i.pravatar.cc/40?img=1",
    "https://i.pravatar.cc/40?img=2",
    "https://i.pravatar.cc/40?img=3",
  ],
} as const;

const heroContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const heroItemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const HERO_DESCRIPTION =
  "Bagikan kabar bahagia mu melalui undangan digital yang didesain untuk menyentuh hati dan memukau setiap tamu.";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % ASSETS.sliderImages.length);
  }, []);

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + ASSETS.sliderImages.length) % ASSETS.sliderImages.length
    );
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval);
  }, [nextSlide]);

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden bg-[#F3F6FD] pt-8 pb-0 lg:pt-10"
    >
      <div className="relative min-h-[calc(100vh-80px)] flex flex-col">
        {/* Content Container */}
        <div className="flex flex-1 flex-col lg:flex-row items-stretch">
          {/* Left Content */}
          <div className="relative z-10 w-full lg:w-1/2 px-4 sm:px-8 lg:px-16 flex flex-col justify-center py-8 lg:py-10">
            <motion.div
              className="text-center lg:text-left"
              variants={heroContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h1
                className="mb-4 flex items-end justify-center lg:justify-start"
                variants={heroItemVariants}
              >
                <div className="relative h-[35px] aspect-[2.5/1] sm:h-[45px] md:h-[55px]">
                  <Image
                    src={ASSETS.undanganTextImg}
                    alt="Undangan"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="relative -mb-1 h-[45px] aspect-[2.5/1] sm:h-[55px] md:h-[70px]">
                  <Image
                    src={ASSETS.digitalTextImg}
                    alt="Digital"
                    fill
                    className="object-contain"
                  />
                </div>
              </motion.h1>

              <motion.p
                className="mx-auto mb-8 mt-4 max-w-md text-sm leading-relaxed text-gray-600 sm:text-base md:text-lg lg:mx-0"
                variants={heroItemVariants}
              >
                {HERO_DESCRIPTION}
              </motion.p>

              <motion.div
                className="flex items-center justify-center gap-4 sm:flex-row sm:gap-5 lg:justify-start"
                variants={heroItemVariants}
              >
                <motion.button
                  className="inline-block rounded-lg bg-[linear-gradient(90deg,rgba(2,100,255,1)_0%,rgba(1,76,196,1)_100%)] px-8 py-3 text-sm font-semibold text-white shadow-[0px_4px_15px_rgba(2,100,255,0.4)] transition hover:opacity-90 hover:shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Selengkapnya
                </motion.button>
                <motion.button
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-3 text-sm font-semibold text-gray-800 shadow-[0px_4px_15px_rgba(0,0,0,0.1)] transition-all hover:bg-gray-50 hover:shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MessageCircle size={18} className="sm:h-5 sm:w-5" /> Hubungi Kami
                </motion.button>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Content - Phone and Avatars */}
          <motion.div
            className="relative w-full lg:w-1/2 flex flex-col items-center justify-center py-8 lg:py-0"
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="relative h-[500px] sm:h-[600px] lg:h-[700px] w-full max-w-sm lg:max-w-none flex items-center justify-center">
              <div className="pointer-events-none relative h-full w-full">
                <Image
                  src={ASSETS.handPhone}
                  alt="Hand holding phone"
                  fill
                  className="object-contain object-center"
                  priority
                />
              </div>

              <div className="pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 h-[280px] sm:h-[330px] lg:h-[420px] w-[120px] sm:w-[140px] lg:w-[180px] overflow-hidden rounded-[28px] sm:rounded-[32px] lg:rounded-[40px] bg-gray-200 shadow-lg">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={currentSlide}
                    className="absolute inset-0 overflow-hidden rounded-[inherit]"
                    initial={{ opacity: 0, x: "100%" }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: "-100%" }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    <Image
                      src={ASSETS.sliderImages[currentSlide]}
                      alt={`Contoh Desain ${currentSlide + 1}`}
                      fill
                      className="object-cover object-center"
                      sizes="(min-width: 1024px) 180px, (min-width: 640px) 140px, 120px"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <button
                onClick={prevSlide}
                className="pointer-events-auto absolute left-0 sm:left-2 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-800 shadow-md transition-all hover:bg-white"
                aria-label="Previous Slide"
              >
                <ChevronLeft size={20} className="sm:h-6 sm:w-6" />
              </button>
              <button
                onClick={nextSlide}
                className="pointer-events-auto absolute right-0 sm:right-2 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-800 shadow-md transition-all hover:bg-white"
                aria-label="Next Slide"
              >
                <ChevronRight size={20} className="sm:h-6 sm:w-6" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Wave Background - Bottom Section */}
        <motion.div
          className="relative w-full mt-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <svg
            className="w-full h-auto"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,40 Q360,0 720,40 T1440,40 L1440,120 L0,120 Z"
              fill="#0264FF"
              className="transition-all duration-300"
            />
          </svg>

          {/* Avatars Section */}
          <div className="relative bg-[#0264FF] px-4 sm:px-8 lg:px-16 py-6 sm:py-8">
            <div className="container mx-auto flex items-center justify-start gap-3 sm:gap-4">
              <div className="flex -space-x-3 sm:-space-x-4">
                {ASSETS.userAvatars.map((avatar, index) => (
                  <Image
                    key={avatar}
                    src={avatar}
                    alt={`User ${index + 1}`}
                    width={40}
                    height={40}
                    className="h-8 w-8 sm:h-10 sm:w-10 rounded-full border-3 border-white shadow-md"
                  />
                ))}
              </div>
              <p className="text-xs sm:text-sm font-medium text-white">
                Telah digunakan lebih dari <br />
                <span className="font-bold">5rb Pengguna</span> 👑
              </p>
            </div>
          </div>
        </motion.div>
      </div>    </section>
  );
};

export default HeroSection;
