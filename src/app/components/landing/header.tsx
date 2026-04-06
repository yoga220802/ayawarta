"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

type HeaderProps = {
  logoUrl?: string;
};

const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "Fitur", href: "#fitur" },
  { name: "Harga", href: "#harga" },
  { name: "Tema", href: "#tema" },
  { name: "Testimoni", href: "#testimoni" },
  { name: "Tentang Kami", href: "#tentang" },
] as const;

const Header = ({ logoUrl = "/images/logo.png" }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const sectionIds = useMemo(
    () => NAV_LINKS.map((link) => link.href.replace("#", "")),
    []
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    sectionIds.forEach((sectionId) => {
      const section = document.getElementById(sectionId);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return (
    <header className="sticky top-0 z-50 bg-white/95 font-sans shadow-md backdrop-blur-xl transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-8 lg:px-16 py-4">
        <div className="flex items-center justify-between">
          <div className="relative h-10 w-32 sm:w-36">
            <Image src={logoUrl} alt="Logo AyaWarta" fill className="object-contain" />
          </div>

          <nav className="hidden items-center md:flex">
            <ul className="flex items-center gap-8 lg:gap-10 font-medium text-gray-600 text-sm lg:text-base">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`transition-colors duration-300 hover:text-blue-600 ${
                      activeSection === link.href.replace("#", "")
                        ? "text-blue-600 font-semibold"
                        : ""
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t border-gray-100 bg-white pb-4 md:hidden">
          <ul className="space-y-2 px-4 sm:px-8 py-2">
            {NAV_LINKS.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-2 px-3 rounded-md font-medium transition-colors ${
                    activeSection === link.href.replace("#", "")
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
