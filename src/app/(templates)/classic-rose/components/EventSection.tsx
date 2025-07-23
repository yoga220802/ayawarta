"use client";
import React from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

interface Event {
	name: string;
	date: string;
	time: string;
	location: string;
	address: string;
	mapLink: string;
}

interface EventProps {
	events: Event[];
}

const EventCard: React.FC<{ event: Event; index: number }> = ({
	event,
	index,
}) => (
	<motion.div
		className='bg-white rounded-lg shadow-lg p-8 text-center'
		initial={{ opacity: 0, y: 50 }}
		whileInView={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.6, delay: index * 0.2 }}
		viewport={{ once: true }}>
		<h3 className='font-serif text-3xl text-[#5C4033] mb-4'>{event.name}</h3>
		<p className='font-sans font-bold text-lg text-gray-800'>{event.date}</p>
		<p className='text-gray-600'>{event.time}</p>
		<hr className='my-6' />
		<p className='font-sans font-bold text-lg text-gray-800'>{event.location}</p>
		<p className='text-sm text-gray-600 mt-2'>{event.address}</p>
		<a
			href={event.mapLink}
			target='_blank'
			rel='noopener noreferrer'
			className='inline-flex items-center gap-2 mt-6 bg-[#8D6E63] text-white font-sans text-sm py-2 px-6 rounded-full hover:bg-[#795548] transition-colors'>
			<MapPin size={16} />
			Lokasi Acara
		</a>
	</motion.div>
);

const EventSection: React.FC<EventProps> = ({ events }) => {
	return (
		<section className='py-20 bg-[#FDF8F8]'>
			<div className='container mx-auto px-8 text-center'>
				<h2 className='font-serif text-4xl text-[#5C4033] mb-12'>
					Rangkaian Acara
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
					{events.map((event, index) => (
						<EventCard key={index} event={event} index={index} />
					))}
				</div>
			</div>
		</section>
	);
};
export default EventSection;
