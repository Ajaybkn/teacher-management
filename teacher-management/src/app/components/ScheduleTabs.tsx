"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	LineChart,
	Line,
	PieChart,
	Pie,
	Cell,
} from "recharts";

const tabs = [
	"Availability",
	"Unavailabilities",
	"Schedule",
	"Invoiced Lessons",
	"Unscheduled Lessons",
	"Time Vouchers",
	"Comments",
	"History",
];

const availabilityData = [
	{ day: "Mon", hours: 8 },
	{ day: "Tue", hours: 6 },
	{ day: "Wed", hours: 0 },
	{ day: "Thu", hours: 7 },
	{ day: "Fri", hours: 5 },
	{ day: "Sat", hours: 0 },
	{ day: "Sun", hours: 0 },
];

const historyData = [
	{ month: "Jan", lessons: 20 },
	{ month: "Feb", lessons: 18 },
	{ month: "Mar", lessons: 25 },
	{ month: "Apr", lessons: 22 },
	{ month: "May", lessons: 26 },
	{ month: "Jun", lessons: 30 },
];

const invoiceData = [
	{ name: "Invoiced", value: 5 },
	{ name: "Uninvoiced", value: 2 },
];

const scheduledLessons = [
	{ time: "9:00 AM", lesson: "Piano" },
	{ time: "10:00 AM", lesson: "Vocal" },
	{ time: "2:00 PM", lesson: "Guitar" },
];

const unscheduledLessons = ["Flute", "Violin", "Drums"];

const timeVouchers = [
	{ name: "Standard Voucher", amount: "5h" },
	{ name: "Holiday Bonus", amount: "2h" },
];

const comments = [
	"Great improvement in vocal technique.",
	"Needs to work on tempo consistency.",
	"Highly punctual and professional.",
];

const COLORS = ["#4f46e5", "#e0e7ff"];

export default function ScheduleTabs() {
	const [active, setActive] = useState("Availability");

	const renderContent = () => {
		switch (active) {
			case "Availability":
				return (
					<ResponsiveContainer width="100%" height={250}>
						<BarChart data={availabilityData}>
							<XAxis dataKey="day" />
							<YAxis domain={[0, 10]} />
							<Tooltip />
							<Bar dataKey="hours" fill="#4f46e5" radius={[4, 4, 0, 0]} />
						</BarChart>
					</ResponsiveContainer>
				);

			case "Unavailabilities":
				return (
					<ul className="space-y-2 text-sm text-gray-700">
						<li>📅 July 15–19 — Vacation</li>
						<li>📅 Aug 5 — Holiday</li>
						<li>📅 Oct 2 — Personal Leave</li>
					</ul>
				);

			case "Schedule":
				return (
					<ul className="text-sm space-y-2">
						{scheduledLessons.map((lesson, idx) => (
							<li key={idx} className="flex justify-between border-b pb-1">
								<span>{lesson.time}</span>
								<span className="font-medium text-blue-700">{lesson.lesson}</span>
							</li>
						))}
					</ul>
				);

			case "Invoiced Lessons":
				return (
					<ResponsiveContainer width="100%" height={250}>
						<PieChart>
							<Pie data={invoiceData} dataKey="value" nameKey="name" outerRadius={80} label>
								{invoiceData.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
								))}
							</Pie>
							<Tooltip />
						</PieChart>
					</ResponsiveContainer>
				);

			case "Unscheduled Lessons":
				return (
					<ul className="list-disc pl-5 text-sm text-gray-700">
						{unscheduledLessons.map((lesson, i) => (
							<li key={i}>{lesson}</li>
						))}
					</ul>
				);

			case "Time Vouchers":
				return (
					<ul className="text-sm text-gray-700 space-y-2">
						{timeVouchers.map((voucher, i) => (
							<li key={i} className="flex justify-between">
								<span>{voucher.name}</span>
								<span className="text-blue-600 font-medium">{voucher.amount}</span>
							</li>
						))}
					</ul>
				);

			case "Comments":
				return (
					<ul className="text-sm text-gray-700 space-y-2">
						{comments.map((comment, i) => (
							<li key={i} className="bg-white border px-3 py-2 rounded shadow-sm">
								{comment}
							</li>
						))}
					</ul>
				);

			case "History":
				return (
					<ResponsiveContainer width="100%" height={250}>
						<LineChart data={historyData}>
							<XAxis dataKey="month" />
							<YAxis />
							<Tooltip />
							<Line type="monotone" dataKey="lessons" stroke="#4f46e5" strokeWidth={2} />
						</LineChart>
					</ResponsiveContainer>
				);

			default:
				return (
					<p className="text-sm text-gray-500">
						Content for <strong>{active}</strong> tab is under construction.
					</p>
				);
		}
	};

	return (
		<div className="mt-8">
			{/* Tab Buttons */}
			<div className="border-b border-gray-200 flex gap-2 overflow-x-auto    pb-2">
				{tabs.map((tab) => (
					<button
						key={tab}
						onClick={() => setActive(tab)}
						className={`text-sm px-4 py-2 rounded-t cursor-pointer  transition font-medium whitespace-nowrap ${
							active === tab
								? "bg-white border border-b-0 border-blue-600 text-blue-600"
								: "bg-gray-100 text-gray-600 hover:bg-gray-200"
						}`}
					>
						{tab}
					</button>
				))}
			</div>

			{/* Tab Content */}
			<motion.div
				key={active}
				initial={{ opacity: 0, y: 8 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.25 }}
				className="bg-gray-50 border border-t-0 p-4 rounded-b shadow-sm min-h-[250px]"
			>
				{renderContent()}
			</motion.div>
		</div>
	);
}
