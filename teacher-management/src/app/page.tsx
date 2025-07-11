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

const COLORS = ["#6366f1", "#34d399", "#fbbf24", "#f87171"];

export default function Dashboard() {
	const totalTeachers = teacherList.length;
	const groupQualified = teacherList.filter((t) => t.groupQualifications.length > 0).length;
	const privateQualified = teacherList.filter((t) => t.privateQualifications.length > 0).length;

	const avgPrivateRate = (
		teacherList.reduce((sum, t) => sum + t.privateQualifications.reduce((s, q) => s + q.rate, 0), 0) /
		teacherList.reduce((sum, t) => sum + t.privateQualifications.length, 0)
	).toFixed(1);

	const barData = teacherList.map((t) => ({
		name: t.name,
		Private: t.privateQualifications.length,
		Group: t.groupQualifications.length,
	}));

	const pieData = [
		{ name: "Private Qualified", value: privateQualified },
		{ name: "Group Qualified", value: groupQualified },
	];

	const rateTrendData = teacherList.map((t) => ({
		name: t.name,
		AverageRate:
			t.privateQualifications.length > 0
				? t.privateQualifications.reduce((s, q) => s + q.rate, 0) / t.privateQualifications.length
				: 0,
	}));

	return (
		<div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6 sm:space-y-8 pb-24">
			<h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">📊 Teacher Dashboard</h1>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
				<div className="bg-gradient-to-tr from-indigo-100 to-indigo-200 p-5 rounded-xl shadow text-center">
					<p className="text-sm font-medium text-indigo-600">Total Teachers</p>
					<p className="text-3xl font-bold text-indigo-900 mt-1">{totalTeachers}</p>
				</div>
				<div className="bg-gradient-to-tr from-green-100 to-green-200 p-5 rounded-xl shadow text-center">
					<p className="text-sm font-medium text-green-600">Private Qualified</p>
					<p className="text-3xl font-bold text-green-900 mt-1">{privateQualified}</p>
				</div>
				<div className="bg-gradient-to-tr from-yellow-100 to-yellow-200 p-5 rounded-xl shadow text-center">
					<p className="text-sm font-medium text-yellow-600">Group Qualified</p>
					<p className="text-3xl font-bold text-yellow-900 mt-1">{groupQualified}</p>
				</div>
				<div className="bg-gradient-to-tr from-pink-100 to-pink-200 p-5 rounded-xl shadow text-center">
					<p className="text-sm font-medium text-pink-600">Avg Private Rate</p>
					<p className="text-3xl font-bold text-pink-900 mt-1">${avgPrivateRate}</p>
				</div>
			</div>

			{/* Bar and Pie Charts */}
			<div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4">
				{/* Bar Chart */}
				<div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg border border-gray-100">
					<h2 className="text-base sm:text-lg font-semibold mb-4 text-indigo-800">📚 Qualifications Distribution</h2>
					<div className="w-full overflow-x-auto">
						<ResponsiveContainer width="100%" height={300}>
							<BarChart data={barData} layout="vertical">
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis type="number" allowDecimals={false} />
								<YAxis type="category" dataKey="name" width={150} />
								<Tooltip />
								<Legend />
								<Bar dataKey="Private" stackId="a" fill="#6366f1" />
								<Bar dataKey="Group" stackId="a" fill="#34d399" />
							</BarChart>
						</ResponsiveContainer>
					</div>
				</div>

				{/* Pie Chart */}
				<div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg border border-gray-100">
					<h2 className="text-base sm:text-lg font-semibold mb-4 text-green-800">👥 Qualified Teachers Split</h2>
					<div className="w-full overflow-x-auto">
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
				</div>
			</div>

			{/* Line Chart */}
			<div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg border border-gray-100">
				<h2 className="text-base sm:text-lg font-semibold mb-4 text-pink-800">📈 Avg Private Qualification Rate</h2>
				<div className="w-full overflow-x-auto">
					<ResponsiveContainer width="100%" height={300}>
						<LineChart data={rateTrendData}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name" angle={-45} textAnchor="end" height={60} interval={0} />
							<YAxis />
							<Tooltip />
							<Line type="monotone" dataKey="AverageRate" stroke="#f87171" strokeWidth={3} dot={{ r: 4 }} />
						</LineChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	);
}
