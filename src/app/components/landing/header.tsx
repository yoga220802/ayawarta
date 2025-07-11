import React, { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

interface HeaderProps {
	logoUrl?: string;
}

const Header: React.FC<HeaderProps> = ({ logoUrl = "/images/logo.png" }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const navLinks = [
		{ name: "Home", href: "#", active: true },
		{ name: "Fitur", href: "#fitur", active: false },
		{ name: "Harga", href: "#harga", active: false },
		{ name: "Tema", href: "#tema", active: false },
		{ name: "Tentang Kami", href: "#kontak", active: false },
	];

	return (
		<header className='bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-50 font-sans'>
			<div className='container mx-auto px-8 py-4'>
				<div className='flex justify-between items-center'>
					{/* Logo */}
					<div className='relative h-10 w-36'>
						<Image
							src={logoUrl}
							alt='Logo AyaWarta'
							fill
							className='object-contain'
						/>
					</div>

					{/* Navigation Menu (Desktop) */}
					<nav className='hidden md:flex items-center'>
						<ul className='flex items-center gap-10 text-gray-700 font-semibold'>
							{navLinks.map((link) => (
								<li key={link.name}>
									<a
										href={link.href}
										className={`nav-link-hover whitespace-nowrap ${
											link.active ? "active text-blue-600" : "hover:text-blue-600"
										}`}>
										{link.name}
									</a>
								</li>
							))}
						</ul>
					</nav>

					{/* Hamburger Menu Button (Mobile) */}
					<div className='md:hidden'>
						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className='text-gray-700 focus:outline-none'
							aria-label='Toggle menu'>
							{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Menu (Conditional Rendering) */}
			{isMenuOpen && (
				<div className='md:hidden bg-white pb-4'>
					<ul className='px-8 space-y-3 text-center'>
						{navLinks.map((link) => (
							<li key={link.name}>
								<a
									href={link.href}
									onClick={() => setIsMenuOpen(false)}
									className={`block py-2 font-semibold ${
										link.active ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
									}`}>
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
