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
    <header className="sticky top-0 z-50 bg-white/80 font-sans shadow-sm backdrop-blur-lg">
      <div className="container mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="relative h-10 w-36">
            <Image src={logoUrl} alt="Logo AyaWarta" fill className="object-contain" />
          </div>

          <nav className="hidden items-center md:flex">
            <ul className="flex items-center gap-10 font-semibold text-gray-700">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`nav-link-hover whitespace-nowrap ${
                      activeSection === link.href.replace("#", "")
                        ? "active text-blue-600"
                        : "hover:text-blue-600"
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
              className="text-gray-700 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="bg-white pb-4 md:hidden">
          <ul className="space-y-3 px-8 text-center">
            {NAV_LINKS.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-2 font-semibold ${
                    activeSection === link.href.replace("#", "")
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
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
