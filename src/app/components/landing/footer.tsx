"use client";

import Image from "next/image";
import { MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";

type ContactInfo = {
  icon: ReactNode;
  text: string;
};

const CONTACT_INFO: ContactInfo[] = [
  {
    icon: <MapPin className="h-5 w-5 text-white/80" />,
    text: "Jl. Mayor Syamsu No.1, Jayaraga, Kec. Tarogong Kidul, Kabupaten Garut, Jawa Barat, INDONESIA 44151",
  },
  {
    icon: <Phone className="h-5 w-5 text-white/80" />,
    text: "+62 xxx xxxx xxxx",
  },
  {
    icon: (
      <div className="relative h-5 w-5">
        <Image src="/images/landing/icons/mail.svg" alt="Mail Icon" fill className="object-contain" />
      </div>
    ),
    text: "ayawarta123@gmail.com",
  },
];

const SOCIAL_LINKS = [
  { name: "Instagram", icon: "/images/landing/icons/instagram.svg", href: "#" },
  { name: "Facebook", icon: "/images/landing/icons/facebook.svg", href: "#" },
  { name: "TikTok", icon: "/images/landing/icons/tiktok.svg", href: "#" },
  { name: "Email", icon: "/images/landing/icons/mail.svg", href: "#" },
] as const;

const Footer = () => {
  return (
    <footer id="tentang" className="relative bg-gray-50">
      <div className="absolute inset-0 h-full w-full">
        <Image
          src="/images/landing/BG footer.svg"
          alt="Footer background"
          fill
          className="object-cover"
        />
      </div>

      <div className="relative z-10 container mx-auto px-8 pb-16 pt-48 text-white">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="md:col-span-2 lg:col-span-1">
            <h2 className="text-3xl font-bold">AyaWarta</h2>
            <p className="mt-1 text-white/80">Undangan Digital, Semudah Bercerita</p>
            <h3 className="mb-4 mt-10 text-xl font-bold">Tentang Kami</h3>
            <p className="text-sm leading-relaxed text-white/80">
              Setiap perayaan, entah itu penyatuan dua hati, sebuah pencapaian baru, atau
              syukuran sederhana, adalah sebuah babak baru yang penuh makna. Kami di
              Ayawarta terinspirasi oleh keindahan momen-momen ini.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/80">
              Kami bertanya pada diri kami sendiri: bagaimana jika sebuah kabar bahagia
              dapat dibagikan dengan cara yang sama indahnya seperti perasaan yang
              menyertainya? Bagaimana jika teknologi bisa membantu kita untuk tidak hanya
              memberi informasi, tetapi juga berbagi cerita.
            </p>
          </div>

          <div className="lg:pl-8">
            <h3 className="mb-6 text-xl font-bold">Kontak</h3>
            <ul className="space-y-4">
              {CONTACT_INFO.map((item) => (
                <li key={item.text} className="flex items-start gap-4">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center">
                    {item.icon}
                  </span>
                  <span className="text-sm text-white/80">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-xl font-bold">Ikuti Kami</h3>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  title={social.name}
                  className="rounded-full bg-white p-3 text-[#0D285B] transition-all duration-300 hover:scale-110 hover:bg-gray-200"
                >
                  <div className="relative h-6 w-6">
                    <Image
                      src={social.icon}
                      alt={`${social.name} Icon`}
                      fill
                      className="object-contain"
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-16 border-t border-white/10">
        <p className="py-6 text-center text-sm text-white/50">
          © {new Date().getFullYear()} AyaWarta. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
