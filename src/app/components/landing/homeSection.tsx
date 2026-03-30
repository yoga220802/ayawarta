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
      className="relative h-[calc(100vh-80px)] w-full overflow-hidden bg-[#F3F6FD]"
    >
      <div className="flex h-full w-full flex-col pt-8 lg:pt-10 lg:pl-10">
        <div className="relative z-10 container mx-auto px-4 sm:px-8 lg:px-16">
          <div className="w-full lg:w-1/2">
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
                  className="inline-block rounded-sm bg-[linear-gradient(90deg,rgba(2,100,255,1)_0%,rgba(1,76,196,1)_100%)] px-8 py-3 text-sm font-medium text-white shadow-[0px_0px_70px_rgba(0,0,0,0.25)] transition hover:opacity-90 hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Selengkapnya
                </motion.button>
                <motion.button
                  className="inline-flex items-center justify-center gap-2 rounded-sm bg-white px-8 py-3 text-sm font-extrabold text-gray-800 shadow-[0px_0px_70px_rgba(0,0,0,0.25)] transition-colors hover:bg-gray-100 hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MessageCircle size={18} className="sm:h-5 sm:w-5" /> Hubungi Kami
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="relative flex-1"
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="absolute inset-x-0 bottom-0 -z-0">
            <Image
              src={ASSETS.bgBlue}
              alt="Background Biru"
              fill
              className="-z-0 !h-[400px] w-auto object-cover object-right lg:!h-auto lg:pl-16"
            />
          </div>

          <div className="relative z-10 flex h-4/5 sm:px-8 lg:h-full lg:px-16">
            <div className="flex items-end gap-3 pb-10 pl-10 sm:gap-4">
              <div className="flex -space-x-2 sm:-space-x-3">
                {ASSETS.userAvatars.map((avatar, index) => (
                  <Image
                    key={avatar}
                    src={avatar}
                    alt={`User ${index + 1}`}
                    width={40}
                    height={40}
                    className="h-8 w-8 rounded-full border-2 border-white shadow-sm sm:h-10 sm:w-10"
                  />
                ))}
              </div>
              <p className="text-xs font-medium text-white sm:text-sm">
                Telah digunakan lebih dari <br />
                <span className="font-bold">5rb Pengguna</span> 👑
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[340px] items-center justify-end lg:flex xl:w-[430px]"
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      >
        <div className="relative h-[740px] w-full xl:h-[760px]">
          <div className="pointer-events-none absolute inset-0 z-20">
            <Image
              src={ASSETS.handPhone}
              alt="Hand holding phone"
              fill
              className="object-contain object-right"
              priority
            />
          </div>

          <div className="pointer-events-auto absolute left-[20%] top-[14%] z-10 h-[54%] w-[43.5%] overflow-hidden rounded-[34px] bg-gray-200 shadow-inner">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentSlide}
                className="absolute inset-0 overflow-hidden rounded-[34px]"
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
                  sizes="(min-width: 1280px) 190px, 170px"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={prevSlide}
            className="pointer-events-auto absolute left-[4%] top-[51%] z-30 -translate-y-1/2 rounded-full bg-white/70 p-2 text-gray-800 shadow-md transition-colors hover:bg-white"
            aria-label="Previous Slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="pointer-events-auto absolute right-[4%] top-[51%] z-30 -translate-y-1/2 rounded-full bg-white/70 p-2 text-gray-800 shadow-md transition-colors hover:bg-white"
            aria-label="Next Slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
