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
      className="w-full h-screen bg-[#F3F6FD] overflow-hidden relative"
    >
      <div className=" w-full h-full flex flex-col lg:pt-10 lg:pl-10">
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
                className="flex items-end justify-center md:justify-start mb-4"
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
          <div className="absolute inset-0 -z-0">
            <Image
              src={ASSETS.bgBlue}
              alt="Background Biru"
              fill
              className="object-contain object-right !h-auto sm:pl-8 lg:pl-16 -z-0"
              onError={(e) =>
                (e.currentTarget.src =
                  "https://placehold.co/1200x520/F3F6FD/333?text=BG")
              }
            />
          </div>
          <div className="sm:px-8 lg:px-16 flex h-full z-10 relative">
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
    </section>
  );
};

export default HeroSection;
