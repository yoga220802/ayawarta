"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// --- SVG Icons ---
const TimeIcon = ({ className }: { className?: string }) => (
	<svg
		className={className}
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'>
		<circle cx='12' cy='12' r='10'></circle>
		<polyline points='12 6 12 12 16 14'></polyline>
	</svg>
);

const MapIcon = ({ className }: { className?: string }) => (
	<svg
		className={className}
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'>
		<path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'></path>
		<circle cx='12' cy='10' r='3'></circle>
	</svg>
);

// --- Interfaces ---
interface Event {
	name: string;
	date: string;
	time: string;
	location: string;
	address: string;
	mapLink: string;
}

interface EventSectionProps {
	events: Event[];
	targetDate: Date;
}

// --- Sub-Components ---
const CountdownTimer: React.FC<{ targetDate: Date }> = ({ targetDate }) => {
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
		const timer = setTimeout(() => setTimeLeft(calculateTimeLeft()), 1000);
		return () => clearTimeout(timer);
	});

	const timeUnits = [
		{ label: "Hari", value: timeLeft.days },
		{ label: "Jam", value: timeLeft.hours },
		{ label: "Menit", value: timeLeft.minutes },
		{ label: "Detik", value: timeLeft.seconds },
	];

	return (
		<div className='grid grid-cols-4 gap-3 text-white'>
			{timeUnits.map((unit) => (
				<div
					key={unit.label}
					className='bg-primary-rose rounded-lg p-2 flex flex-col items-center justify-center aspect-square'>
					<span className='font-alice text-2xl'>
						{String(unit.value).padStart(2, "0")}
					</span>
					<span className='font-alice text-xs'>{unit.label}</span>
				</div>
			))}
		</div>
	);
};

const EventCard: React.FC<{ event: Event; targetDate: Date }> = ({
	event,
	targetDate,
}) => {
	const [day, month, year] = event.date.split(" ");

	return (
		<div className='relative w-full p-6 text-center text-primary-rose bg-white/60 backdrop-blur-sm rounded-2xl'>
			<div className='absolute -top-4 -left-4 w-28 h-28 md:w-44 md:h-44'>
				<Image
					src='/images/themes/classic-rose/event-frame.png'
					alt='Bingkai'
					fill
				/>
			</div>
			<div className='absolute -bottom-4 -right-4 w-28 h-28 md:w-44 md:h-44 transform rotate-180'>
				<Image
					src='/images/themes/classic-rose/event-frame.png'
					alt='Bingkai'
					fill
				/>
			</div>

			<div className='relative z-10 flex flex-col items-center gap-4'>
				<h3 className='font-alice text-3xl'>{event.name}</h3>
				<div className='flex items-center justify-center gap-4'>
					<p className='font-alice text-7xl font-bold'>{day}</p>
					<div className='text-left'>
						<p className='font-alice text-2xl'>{month}</p>
						<p className='font-alice text-2xl'>{year}</p>
					</div>
				</div>
				<div className='flex items-center gap-2 text-sm'>
					<TimeIcon className='w-4 h-4' />
					<p className='font-alice'>{event.time}</p>
				</div>
				<div className='mt-2'>
					<p className='font-alice text-xl font-semibold'>{event.location}</p>
					<p className='font-alice text-xs max-w-xs mx-auto mt-1'>{event.address}</p>
				</div>
				<a
					href={event.mapLink}
					target='_blank'
					rel='noopener noreferrer'
					className='mt-2 inline-flex items-center gap-2 bg-primary-rose text-white text-sm px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors'>
					<MapIcon className='w-4 h-4' />
					Lokasi Acara
				</a>
				<div className='w-full max-w-xs mt-2'>
					<CountdownTimer targetDate={targetDate} />
				</div>
			</div>
		</div>
	);
};

// --- Main Component ---
const EventSection: React.FC<EventSectionProps> = ({ events, targetDate }) => {
	// FIX: Menghapus variabel mapEmbedLink yang tidak terpakai
	return (
		<section className='relative py-20 md:py-32 bg-[#FDF8F8] overflow-hidden'>
			<div className='absolute inset-0 z-0'>
				<Image
					src='/images/themes/classic-rose/opening/bg.png'
					alt='Background'
					fill
					className='object-cover'
				/>
				<div className='absolute -top-20 -left-28 w-64 h-96 md:w-[415px] md:h-[690px]'>
					<Image
						src='/images/themes/classic-rose/opening/bunga.png'
						alt='Bunga Kiri Atas'
						fill
						className='object-contain'
					/>
				</div>
				<div className='absolute -bottom-20 -right-28 w-64 h-96 md:w-[415px] md:h-[690px] transform rotate-180'>
					<Image
						src='/images/themes/classic-rose/opening/bunga.png'
						alt='Bunga Kanan Bawah'
						fill
						className='object-contain'
					/>
				</div>
			</div>

			<div className='relative z-10 container mx-auto px-4 sm:px-8 max-w-md flex flex-col items-center gap-10'>
				<motion.div
					className='px-8 py-2 rounded-lg bg-white/60 backdrop-blur-sm'
					initial={{ opacity: 0, y: -50 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}>
					<h2 className='font-alice text-3xl text-primary-rose'>Rangkaian Acara</h2>
				</motion.div>

				{events.map((event, index) => (
					<motion.div
						key={index}
						className='w-full'
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8, delay: index * 0.2 }}>
						<EventCard event={event} targetDate={targetDate} />
					</motion.div>
				))}

				<motion.div
					className='w-full aspect-video rounded-lg overflow-hidden shadow-lg mt-4'
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}>
					<iframe
						src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.000005799977!2d107.88693587485302!3d-7.240581992762208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68b0f1ac345797%3A0x2527a85704e6c2e!2sGraha%20Intan%20Balarea!5e0!3m2!1sid!2sid!4v1722532731557!5m2!1sid!2sid'
						width='100%'
						height='100%'
						style={{ border: 0 }}
						allowFullScreen={true}
						loading='lazy'
						referrerPolicy='no-referrer-when-downgrade'></iframe>
				</motion.div>
			</div>
		</section>
	);
};

export default EventSection;
