"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

interface HeaderProps {
	logoUrl?: string;
}

const navLinks = [
	{ name: "Home", href: "#home" },
	{ name: "Fitur", href: "#fitur" },
	{ name: "Harga", href: "#harga" },
	{ name: "Tema", href: "#tema" },
	{ name: "Testimoni", href: "#testimoni" },
	{ name: "Tentang Kami", href: "#tentang" },
];

const Header: React.FC<HeaderProps> = ({ logoUrl = "/images/logo.png" }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	// State untuk melacak section yang aktif
	const [activeSection, setActiveSection] = useState("home");

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

		navLinks.forEach((link) => {
			const sectionId = link.href.substring(1);
			const section = document.getElementById(sectionId);
			if (section) {
				observer.observe(section);
			}
		});

		return () => observer.disconnect();
	}, []);

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
							onError={(e) =>
								(e.currentTarget.src =
									"https://placehold.co/144x40/FFFFFF/333?text=Logo")
							}
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
											activeSection === link.href.substring(1)
												? "active text-blue-600"
												: "hover:text-blue-600"
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
										activeSection === link.href.substring(1)
											? "text-blue-600"
											: "text-gray-700 hover:text-blue-600"
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
