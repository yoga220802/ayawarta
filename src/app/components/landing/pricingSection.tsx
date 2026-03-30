"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

type PricingPlan = {
  name: string;
  price: string;
  period: string;
  features: string[];
  buttonText: string;
  isPopular: boolean;
};

const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Basic",
    price: "0",
    period: "/Gratis Seminggu",
    features: [
      "5 Pilihan Template Dasar",
      "Detail Acara & Peta Lokasi",
      "Tanpa Foto",
      "Terdapat Watermark/Branding Kami",
    ],
    buttonText: "Coba",
    isPopular: false,
  },
  {
    name: "Standar",
    price: "39",
    period: ".999 /Bulan",
    features: [
      "20+ Pilihan Template Premium",
      "Semua fitur di paket Basic",
      "Buku Tamu & Ucapan Digital",
      "Fitur Kirim Kado Digital",
      "Galeri Foto & Video (max. 10 Foto)",
      "Tanpa Watermark/Branding",
    ],
    buttonText: "Pesan Sekarang",
    isPopular: true,
  },
  {
    name: "Premium",
    price: "79",
    period: ".999 /Bulan",
    features: [
      "Semua Tema Eksklusif",
      "Semua fitur di paket Standard",
      "Fitur Siaran Langsung (Live)",
      "Kustomisasi Musik Latar",
      "Pena Kisah Ajaib (Love Story) AI",
    ],
    buttonText: "Pesan Sekarang",
    isPopular: false,
  },
];

const PAYMENT_METHODS = [
  { name: "QRIS", path: "/images/landing/payments/QRIS.png" },
  { name: "Mastercard", path: "/images/landing/payments/Mastercard.png" },
  { name: "VISA", path: "/images/landing/payments/Visa.png" },
  { name: "BCA", path: "/images/landing/payments/BCA.png" },
  { name: "BNI", path: "/images/landing/payments/BNI.png" },
  { name: "BRI", path: "/images/landing/payments/BRI.png" },
  { name: "Mandiri", path: "/images/landing/payments/Mandiri.png" },
  { name: "OVO", path: "/images/landing/payments/Ovo.png" },
  { name: "Dana", path: "/images/landing/payments/Dana.png" },
  { name: "ShopeePay", path: "/images/landing/payments/ShopeePay.png" },
  { name: "GoPay", path: "/images/landing/payments/Gopay.png" },
] as const;

const BG_BLUE_PRICING = "/images/landing/bg-blue-pricing.png";

const PricingSection = () => {
  return (
    <section id="harga" className="bg-white py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-12 text-center lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-extrabold text-gray-800 lg:text-4xl">Daftar Harga</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
            Kami menyediakan pilihan yang fleksibel dan transparan untuk setiap
            kebutuhan dan anggaran.
          </p>
        </motion.div>

        <div className="relative">
          <Image
            src={BG_BLUE_PRICING}
            alt="Background Harga"
            fill
            className="rounded-[50px] object-cover"
          />

          <div className="grid w-full grid-cols-1 gap-8 p-8 md:p-12 lg:grid-cols-3">
            {PRICING_PLANS.map((plan, index) => (
              <motion.div
                key={plan.name}
                className={`relative flex flex-col rounded-3xl bg-white p-8 shadow-lg ${
                  plan.isPopular
                    ? "scale-105 border-2 border-blue-400"
                    : "border border-gray-200"
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                {plan.isPopular && (
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500 px-4 py-1 text-sm font-bold text-white">
                    Paling Populer
                  </div>
                )}

                <h3 className="mb-4 text-xl font-bold text-blue-600">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-gray-800">Rp {plan.price}</span>
                  <span className="font-medium text-gray-500">{plan.period}</span>
                </div>

                <ul className="mb-8 flex-grow space-y-4 text-gray-600">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="mr-3 mt-1 h-5 w-5 shrink-0 text-blue-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full rounded-lg py-3 text-lg font-bold transition-transform duration-200 hover:scale-105 ${
                    plan.isPopular ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {plan.buttonText}
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-20 text-center">
          <h3 className="mb-6 text-xl font-bold text-gray-700">Mendukung Pembayaran</h3>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 md:gap-x-10">
            {PAYMENT_METHODS.map((method) => (
              <motion.div
                key={method.name}
                className="relative h-8 w-16 md:h-10 md:w-20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
              >
                <Image src={method.path} alt={method.name} fill className="object-contain" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
