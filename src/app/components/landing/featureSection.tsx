"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock,
  Gift,
  MapPin,
  MessageSquareQuote,
  Users,
} from "lucide-react";

type FeatureItem = {
  icon: ReactNode;
  title: string;
  description: string;
};

const FEATURES_DATA: FeatureItem[] = [
  {
    icon: <Clock size={32} className="text-white" />,
    title: "Hitung mundur waktu",
    description: "Tampilkan waktu hitung mundur agar acaramu semakin ditunggu-tunggu.",
  },
  {
    icon: <Gift size={32} className="text-white" />,
    title: "Kirim kado",
    description: "Tamu bisa mengirimkan hadiah digital dengan mudah.",
  },
  {
    icon: <Users size={32} className="text-white" />,
    title: "Unlimited tamu",
    description: "Undang semua orang penting tanpa pusing mikirin batasan jumlah tamu.",
  },
  {
    icon: <MessageSquareQuote size={32} className="text-white" />,
    title: "Ucapan Digital",
    description: "Abadikan setiap doa dan ucapan dari tamu pada buku tamu online.",
  },
  {
    icon: <CalendarDays size={32} className="text-white" />,
    title: "Rangkaian Acara",
    description: "Pastikan semua tamu hadir di momen yang tepat.",
  },
  {
    icon: <MapPin size={32} className="text-white" />,
    title: "Peta Lokasi",
    description: "Bantu tamu menemukan lokasi acaramu tanpa takut nyasar.",
  },
];

const ASSETS = {
  phoneFeature: "/images/landing/feature-phone.png",
  bgBlueFeature: "/images/landing/bg-blue-features.png",
} as const;

const FeatureSection = () => {
  return (
    <section id="fitur" className="bg-white py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-12 text-center lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-extrabold text-gray-800 lg:text-4xl">
            Fitur-Fitur untuk Momen Terbaikmu
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-500">
            Di sini, kamu pilih bisa desain, sebar undangan, dan lihat siapa aja yang
            datang, semuanya dari satu tempat.
          </p>
        </motion.div>

        <div className="relative flex items-center justify-center">
          <motion.div
            className="absolute left-0 top-1/2 z-20 hidden h-[600px] w-[300px] -translate-y-1/2 lg:block"
            initial={{ opacity: 0, x: -100, rotate: -15 }}
            whileInView={{ opacity: 1, x: 0, rotate: -10 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Image
              src={ASSETS.phoneFeature}
              alt="Fitur Undangan di HP"
              fill
              className="object-contain"
            />
          </motion.div>

          <motion.div
            className="relative z-10 w-full max-w-5xl rounded-[40px] p-8 md:p-12 lg:pl-48"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Image
              src={ASSETS.bgBlueFeature}
              alt="Background Fitur"
              fill
              className="-z-10 rounded-[40px] object-cover"
            />

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {FEATURES_DATA.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="rounded-lg bg-white/20 p-3">{feature.icon}</div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{feature.title}</h3>
                    <p className="mt-1 text-white/80">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
