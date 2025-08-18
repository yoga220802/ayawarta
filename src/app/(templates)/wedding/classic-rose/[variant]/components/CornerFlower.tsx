// src/components/templates/classic-rose/CornerFlower.tsx
import Image from "next/image";
import { motion } from "framer-motion";

type Position = "top-left" | "top-right" | "bottom-left" | "bottom-right";

interface CornerFlowerProps {
	flowerSrc: string;
	position: Position;
}

// Menggunakan negative positioning (-top-px, dll.) untuk menarik gambar
// sedikit keluar dari batas container, menghilangkan celah antar section.
const positionClasses: Record<Position, string> = {
	"top-left": "-top-px -left-px",
	"top-right": "-top-px -right-px transform -scale-x-100",
	"bottom-left": "-bottom-px -left-px transform -scale-y-100",
	"bottom-right": "-bottom-px -right-px transform rotate-180",
};

/**
 * Komponen hiasan bunga. Parent HARUS memiliki `position: relative`.
 * Bunga akan ditempatkan di layer z-10, di belakang konten (z-20).
 */
const CornerFlower: React.FC<CornerFlowerProps> = ({ flowerSrc, position }) => {
	return (
		<motion.div
			className={`absolute w-48 h-72 md:w-64 md:h-96 z-10 pointer-events-none ${positionClasses[position]}`}
			initial={{ opacity: 0, scale: 0.8 }}
			whileInView={{ opacity: 1, scale: 1 }}
			viewport={{ once: true, amount: 0.1 }}
			transition={{ duration: 1, ease: "easeOut" }}>
			<Image
				src={flowerSrc}
				alt={`Bunga Hiasan ${position}`}
				fill
				className='object-contain'
			/>
		</motion.div>
	);
};

export default CornerFlower;
