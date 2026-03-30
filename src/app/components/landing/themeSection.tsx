"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Eye,
  Search,
} from "lucide-react";

const CATEGORIES = [
  "Semua",
  "Pernikahan",
  "Ulang Tahun",
  "Wisuda",
  "Khitanan",
  "Aqiqah",
  "Halal Bihalal",
  "Tahlilan",
] as const;

const COLOR_OPTIONS = [
  "#FF5733",
  "#33FF57",
  "#3357FF",
  "#FF33A1",
  "#A133FF",
  "#33FFA1",
  "#FFC300",
  "#C70039",
] as const;

const ITEMS_PER_PAGE = 8;

type ThemeItem = {
  id: number;
  imageSrc: string;
  title: string;
  code: string;
  category: (typeof CATEGORIES)[number];
};

const DUMMY_THEMES: ThemeItem[] = Array.from({ length: 50 }, (_, index) => {
  const category = CATEGORIES[(index % 7) + 1];

  return {
    id: index + 1,
    imageSrc: `/images/landing/dummy/themes/contoh tema ${(index % 8) + 1}.jpeg`,
    title: `${category} - #${index + 1}`,
    code: `${123456 + index}`,
    category,
  };
});

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-12 flex items-center justify-center gap-2">
      <button
        title="Halaman Sebelumnya"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-md bg-white p-2 shadow-sm disabled:opacity-50"
      >
        <ChevronLeft />
      </button>
      <span className="font-medium text-gray-600">
        Halaman {currentPage} dari {totalPages}
      </span>
      <button
        title="Halaman Berikutnya"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-md bg-white p-2 shadow-sm disabled:opacity-50"
      >
        <ChevronRight />
      </button>
    </div>
  );
};

const ThemeSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]>(
    "Semua"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredThemes = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase();

    return DUMMY_THEMES.filter((theme) => {
      const matchesCategory =
        activeCategory === "Semua" || theme.category === activeCategory;
      const matchesSearch =
        theme.title.toLowerCase().includes(normalizedSearch) ||
        theme.code.includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  const totalPages = Math.ceil(filteredThemes.length / ITEMS_PER_PAGE);

  const paginatedThemes = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredThemes.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredThemes, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchTerm]);

  return (
    <section id="tema" className="bg-gray-50 py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-extrabold text-gray-800 lg:text-4xl">
            {isExpanded ? (
              "Pilih Tema Yang Kamu Mau"
            ) : (
              <>
                Berbagai Jenis <span className="text-blue-600">Tema</span>
              </>
            )}
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-500">
            {!isExpanded &&
              "Setiap momen memiliki jiwa dan ceritanya sendiri. Oleh karena itu, kami menghadirkan koleksi desain yang beragam untuk mewakili setiap gaya."}
          </p>
        </motion.div>

        <div className="mb-12 flex flex-wrap justify-center gap-2 md:gap-3">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300 md:text-base ${
                activeCategory === category
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="mx-auto mb-12 max-w-2xl"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Cari tema (contoh: Aquatic atau 123456)"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
              </div>

              <div className="flex items-center gap-3">
                <p className="text-sm font-semibold text-gray-600">
                  Pilih Warna Yang Kamu Suka:
                </p>
                <div className="flex gap-2">
                  {COLOR_OPTIONS.map((color) => (
                    <button
                      key={color}
                      title="Pilih Warna"
                      style={{ backgroundColor: color }}
                      className="h-6 w-6 rounded-full border-2 border-white shadow-sm transition-transform hover:scale-110"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
          {paginatedThemes.map((theme, index) => (
            <motion.div
              key={theme.id}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src={theme.imageSrc}
                  alt={theme.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-grow flex-col p-3">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold text-gray-700">
                    {theme.title} ({theme.code})
                  </p>
                  <a href="#" title="Lihat di halaman baru" className="shrink-0">
                    <ExternalLink className="h-4 w-4 text-gray-400 hover:text-blue-600" />
                  </a>
                </div>
                <div className="mt-auto flex items-center gap-2">
                  <button className="flex flex-grow items-center justify-center gap-1 rounded-full bg-gray-100 px-2 py-2 text-xs font-semibold text-gray-800 transition-colors hover:bg-gray-200">
                    <Eye className="h-4 w-4" />
                    Preview
                  </button>
                  <button
                    className="shrink-0 rounded-full bg-blue-100 p-2 text-blue-600 transition-colors hover:bg-blue-200"
                    title="Simpan tema"
                  >
                    <Bookmark className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {isExpanded ? (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        ) : (
          <div className="mt-16 text-center">
            <button
              onClick={() => setIsExpanded(true)}
              className="rounded-lg bg-blue-600 px-8 py-3 text-lg font-bold text-white shadow-lg transition-transform duration-200 hover:scale-105 hover:bg-blue-700"
            >
              Tampilkan Tema Lainnya
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ThemeSection;
