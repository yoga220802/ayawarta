"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

type TestimonialItem = {
  name: string;
  category: string;
  rating: number;
  text: string;
  imageSrc: string;
};

const DUMMY_TESTIMONIALS: TestimonialItem[] = [
  {
    name: "Joel & Ellie",
    category: "Pernikahan",
    rating: 5,
    text: "Jujur, urusan undangan ini hampir bikin kami berantem, haha. Stres banget bolak-balik percetakan. Pas nemu platform ini, wah... rasanya kayak nemu harta karun. Gak ada lagi drama revisi. Paling seneng pas liat ucapan dari teman-teman di buku tamu digitalnya, jadi bisa dibaca-baca ulang sambil senyum-senyum sendiri. Sumpah, worth it banget.",
    imageSrc: "/images/landing/dummy/testimony/contoh testimoni 1.jpeg",
  },
  {
    name: "Hendra",
    category: "Khitanan",
    rating: 5,
    text: "Saya bukan orang yang ngerti-ngerti banget teknologi, tapi buat acara syukuran khitanan anak, saya mau yang praktis. Ternyata pakai ini gampang banget. Tinggal klik-klik, isi info, sebar link ke grup keluarga, selesai. Gak ada lagi pertanyaan 'Acaranya di mana?' atau 'Jam berapa?' berulang-ulang di WhatsApp. Bikin kepala adem.",
    imageSrc: "/images/landing/dummy/testimony/contoh testimoni 2.jpeg",
  },
  {
    name: "Citra",
    category: "Wisuda",
    rating: 4,
    text: "Mau wisuda, pengen undang temen-temen tapi budget pas-pasan, hehe. Iseng nyoba yang paket standar di sini, kaget banget! Desainnya kekinian, gak kelihatan murahan sama sekali. Temen-temenku pada muji undangannya, dikira aku jago desain. Padahal tinggal chat miminya sama isi formulir doang.",
    imageSrc: "/images/landing/dummy/testimony/contoh testimoni 3.jpeg",
  },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={`${rating}-${index}`}
        className={`h-5 w-5 ${
          index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ))}
  </div>
);

const TestimonialSection = () => {
  return (
    <section id="testimoni" className="bg-gray-50 py-20 lg:py-32">
      <div className="container mx-auto">
        <motion.div
          className="mb-12 px-4 text-center lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-extrabold text-gray-800 lg:text-4xl">Testimoni</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
            Intip beberapa kesan dari para pengguna yang telah merayakan momen
            istimewanya bersama kami.
          </p>
        </motion.div>

        <div className="-mx-4 flex snap-x snap-mandatory space-x-8 overflow-x-auto px-4 pb-8 scroll-pl-4 md:scroll-pl-6 lg:scroll-pl-8">
          {DUMMY_TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="relative aspect-[9/12] w-[85vw] shrink-0 snap-center overflow-hidden rounded-3xl shadow-xl sm:w-[350px]"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Image
                src={testimonial.imageSrc}
                alt={testimonial.name}
                fill
                className="object-cover"
              />

              <div className="absolute bottom-4 left-4 right-4">
                <div className="rounded-2xl bg-white/80 p-4 shadow-lg backdrop-blur-[10px]">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{testimonial.name}</h3>
                      <p className="text-xs text-gray-600">{testimonial.category}</p>
                    </div>
                    <StarRating rating={testimonial.rating} />
                  </div>
                  <p className="text-xs leading-relaxed text-gray-700">{testimonial.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
