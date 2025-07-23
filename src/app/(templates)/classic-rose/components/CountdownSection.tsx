"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CountdownProps {
	targetDate: Date;
}

const CountdownSection: React.FC<CountdownProps> = ({ targetDate }) => {
	const calculateTimeLeft = () => {
		const difference = +targetDate - +new Date();
		let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

		if (difference > 0) {
			timeLeft = {
				days: Math.floor(difference / (1000 * 60 * 60 * 24)),
				hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
				minutes: Math.floor((difference / 1000 / 60) % 60),
				seconds: Math.floor((difference / 1000) % 60),
			};
		}
		return timeLeft;
	};

	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

	useEffect(() => {
		const timer = setTimeout(() => {
			setTimeLeft(calculateTimeLeft());
		}, 1000);
		return () => clearTimeout(timer);
	});

	const timeUnits = [
		{ label: "Hari", value: timeLeft.days },
		{ label: "Jam", value: timeLeft.hours },
		{ label: "Menit", value: timeLeft.minutes },
		{ label: "Detik", value: timeLeft.seconds },
	];

	return (
		<section className='py-20 bg-[#FDF8F8]'>
			<div className='container mx-auto px-8 text-center'>
				<div className='grid grid-cols-4 gap-4 max-w-lg mx-auto'>
					{timeUnits.map((unit, index) => (
						<motion.div
							key={unit.label}
							className='bg-white p-4 rounded-lg shadow-md'
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							viewport={{ once: true }}>
							<p className='font-serif text-4xl text-[#5C4033]'>
								{String(unit.value).padStart(2, "0")}
							</p>
							<p className='font-sans text-xs text-gray-500 mt-1'>{unit.label}</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};
export default CountdownSection;
