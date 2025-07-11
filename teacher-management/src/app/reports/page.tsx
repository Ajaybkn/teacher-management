"use client";

import { teacherList } from "@/app/utils/data";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	PieChart,
	Pie,
	Cell,
	Legend,
	LineChart,
	Line,
	CartesianGrid,
} from "recharts";

const COLORS = ["#6366f1", "#34d399", "#fbbf24", "#f87171", "#60a5fa", "#a78bfa"];

export default function Reports() {
	// Qualification frequency by type
	const qualificationCounts: Record<string, number> = {};

	teacherList.forEach((teacher) => {
		[...teacher.privateQualifications, ...teacher.groupQualifications].forEach((q) => {
			qualificationCounts[q.name] = (qualificationCounts[q.name] || 0) + 1;
		});
	});

	const qualificationBarData = Object.entries(qualificationCounts).map(([name, count]) => ({
		name,
		count,
	}));

	// Pie chart data for type split
	const totalPrivate = teacherList.reduce((acc, t) => acc + t.privateQualifications.length, 0);
	const totalGroup = teacherList.reduce((acc, t) => acc + t.groupQualifications.length, 0);

	const pieData = [
		{ name: "Private Qualifications", value: totalPrivate },
		{ name: "Group Qualifications", value: totalGroup },
	];

	// Line chart for average rate per teacher
	const avgRatePerTeacher = teacherList.map((teacher) => {
		const allRates = [
			...teacher.privateQualifications.map((q) => q.rate),
			...teacher.groupQualifications.map((q) => q.rate),
		];
		const avg = allRates.length ? allRates.reduce((a, b) => a + b, 0) / allRates.length : 0;

		return {
			name: teacher.name,
			avgRate: parseFloat(avg.toFixed(1)),
		};
	});

	return (
		<div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-8 pb-24">
			<h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">📈 Reports</h1>

			{/* Qualification Counts */}
			<div className="bg-white p-6 rounded-lg shadow border border-gray-100">
				<h2 className="text-lg font-semibold mb-4 text-indigo-800">📚 Qualification Count by Subject</h2>
				<ResponsiveContainer width="100%" height={300}>
					<BarChart data={qualificationBarData}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Bar dataKey="count" fill="#6366f1" />
					</BarChart>
				</ResponsiveContainer>
			</div>

			{/* Type Split */}
			<div className="bg-white p-6 rounded-lg shadow border border-gray-100">
				<h2 className="text-lg font-semibold mb-4 text-green-800">🧮 Qualification Type Split</h2>
				<ResponsiveContainer width="100%" height={300}>
					<PieChart>
						<Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
							{pieData.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
							))}
						</Pie>
						<Legend />
						<Tooltip />
					</PieChart>
				</ResponsiveContainer>
			</div>

			{/* Avg Rate per Teacher */}
			<div className="bg-white p-6 rounded-lg shadow border border-gray-100">
				<h2 className="text-lg font-semibold mb-4 text-pink-800">💸 Average Qualification Rate per Teacher</h2>
				<ResponsiveContainer width="100%" height={300}>
					<LineChart data={avgRatePerTeacher}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" angle={-45} textAnchor="end" height={70} interval={0} />
						<YAxis />
						<Tooltip />
						<Line type="monotone" dataKey="avgRate" stroke="#f87171" strokeWidth={2} dot={{ r: 4 }} />
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}
