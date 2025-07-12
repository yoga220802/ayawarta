"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";

// --- Data & Asset Constants ---
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
};

const TESTIMONIAL_DATA = {
  avatars: ASSETS.userAvatars,
  text: (
    <>
      Telah digunakan lebih dari <br />
      <span className="font-bold">5rb Pengguna</span> 👑
    </>
  ),
};

// --- Framer Motion Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === ASSETS.sliderImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? ASSETS.sliderImages.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <section
      id="home"
      className="w-full h-[calc(100vh-80px)] bg-[#F3F6FD] overflow-hidden relative"
    >
      <div className=" w-full h-full flex flex-col pt-8 lg:pt-10 lg:pl-10">
        {/* Main Content Container - Flexbox for alignment */}
        <div className="relative z-10 container mx-auto px-4 sm:px-8 lg:px-16">
          <div className="w-full lg:w-1/2">
            {/* Left Content - Text and Buttons */}
            <motion.div
              className="text-center lg:text-left"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Title with Images */}
              <motion.h1
                className="flex items-end justify-center lg:justify-start mb-4"
                variants={itemVariants}
              >
                <div className="h-[35px] sm:h-[45px] md:h-[55px] aspect-[2.5/1] relative">
                  <Image
                    src={ASSETS.undanganTextImg}
                    alt="Undangan"
                    fill
                    className="object-contain"
                    onError={(e) =>
                      (e.currentTarget.src =
                        "https://placehold.co/137x55/F3F6FD/333?text=Undangan")
                    }
                  />
                </div>
                <div className="h-[45px] sm:h-[55px] md:h-[70px] aspect-[2.5/1] relative -mb-1">
                  <Image
                    src={ASSETS.digitalTextImg}
                    alt="Digital"
                    fill
                    className="object-contain"
                    onError={(e) =>
                      (e.currentTarget.src =
                        "https://placehold.co/175x70/F3F6FD/333?text=Digital")
                    }
                  />
                </div>
              </motion.h1>

              {/* Description */}
              <motion.p
                className="mt-4 mb-8 text-sm sm:text-base md:text-lg text-gray-600 max-w-md mx-auto lg:mx-0 leading-relaxed"
                variants={itemVariants}
              >
                Bagikan kabar bahagia mu melalui undangan digital yang didesain
                untuk menyentuh hati dan memukau setiap tamu.
              </motion.p>

              {/* Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-center justify-center lg:justify-start"
                variants={itemVariants}
              >
                <motion.button
                  className="inline-block rounded-sm  px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl  shadow-[0px_0px_70px_rgba(0,0,0,0.25)] hover:opacity-90 bg-[linear-gradient(90deg,rgba(2,100,255,1)_0%,rgba(1,76,196,1)_100%)]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Selengkapnya
                </motion.button>
                <motion.button
                  className=" bg-white text-gray-800 shadow-[0px_0px_70px_rgba(0,0,0,0.25)] hover:bg-gray-100 transition-colors font-extrabold rounded-sm px-8 py-3 text-sm  hover:shadow-xl inline-flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MessageCircle size={18} className="sm:w-5 sm:h-5" /> Hubungi
                  Kami
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>
        {/* Background Blue Shape */}
        <motion.div
          className="w-full flex-1 relative"
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="relative">
            <div className="absolute left-0 right-0 bottom-0 -z-0">
              <Image
                src={ASSETS.bgBlue}
                alt="Background Biru"
                fill
                className="object-cover object-right w-auto !h-[400px] lg:!h-auto  lg:pl-16 -z-0"
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://placehold.co/1200x520/F3F6FD/333?text=BG")
                }
              />
            </div>
          </div>
          <div className="sm:px-8 lg:px-16 flex h-4/5 lg:h-full z-10 relative">
            {/* User testimonial at bottom */}
            <div className="flex items-end gap-3 sm:gap-4 pl-10 pb-10">
              <div className="flex -space-x-2 sm:-space-x-3">
                {TESTIMONIAL_DATA.avatars.map((avatar, index) => (
                  <Image
                    key={index}
                    src={avatar}
                    alt={`User ${index + 1}`}
                    width={32}
                    height={32}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white shadow-sm"
                    onError={(e) =>
                      (e.currentTarget.src = `https://placehold.co/40/FFFFFF/333?text=U${
                        index + 1
                      }`)
                    }
                  />
                ))}
              </div>
              <p className="text-white text-xs sm:text-sm font-medium">
                {TESTIMONIAL_DATA.text}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute top-0 right-0 h-full w-[280px] sm:w-[350px] md:w-[400px] lg:w-[450px] hidden lg:flex items-center pointer-events-none"
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      >
        <div className=" w-full h-[750px]">
          {/* Hand holding phone image */}
          <div className="absolute inset-0 z-20">
            <Image
              src={ASSETS.handPhone}
              alt="Hand holding phone"
              fill
              className="object-contain"
              onError={(e) =>
                (e.currentTarget.src =
                  "https://placehold.co/450x750/F3F6FD/333?text=Phone")
              }
            />
          </div>

          {/* Phone screen with slider */}
          <div className="absolute w-[190px] h-[409px] top-1/2 left-[50%] -translate-x-[91.5%] -translate-y-[74%] rounded-[30px] overflow-hidden bg-gray-200 shadow-inner z-10 pointer-events-auto">
            <AnimatePresence initial={false}>
              <motion.div
                key={currentSlide}
                className="absolute inset-0 rounded-[30px] overflow-hidden"
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "-100%" }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <Image
                  src={ASSETS.sliderImages[currentSlide]}
                  alt={`Contoh Desain ${currentSlide + 1}`}
                  fill
                  className="object-cover"
                  onError={(e) =>
                    (e.currentTarget.src = `https://placehold.co/190x409/CCCCCC/333?text=Slide+${
                      currentSlide + 1
                    }`)
                  }
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-[5px] top-1/2 -translate-y-[100%] bg-white/60 p-2 rounded-full text-gray-800 hover:bg-white transition-colors shadow-md z-30 pointer-events-auto"
            aria-label="Previous Slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-[150px] top-1/2 -translate-y-[100%] bg-white/60 p-2 rounded-full text-gray-800 hover:bg-white transition-colors shadow-md z-30 pointer-events-auto"
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
