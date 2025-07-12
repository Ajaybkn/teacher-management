"use client";

import React, { useState } from "react";
import { teacherList } from "@/app/utils/data";
import { Download, EyeOff, Eye } from "lucide-react";

const Settings = () => {
	const [visibleColumns, setVisibleColumns] = useState({
		name: true,
		email: true,
		phone: true,
		privateQualifications: true,
		groupQualifications: true,
	});

	const toggleColumn = (key: keyof typeof visibleColumns) => {
		setVisibleColumns((prev) => ({ ...prev, [key]: !prev[key] }));
	};

	const downloadJSON = () => {
		const blob = new Blob([JSON.stringify(teacherList, null, 2)], {
			type: "application/json",
		});
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "teachers-data.json";
		a.click();
		URL.revokeObjectURL(url);
	};

	return (
		<div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
			<h1 className="text-3xl font-bold text-gray-800">⚙️ Settings</h1>

			{/* Toggle Columns */}
			<div className="bg-white p-4 border rounded-lg shadow">
				<h2 className="text-lg font-semibold text-gray-700  mb-4">🧩 Customize Columns</h2>
				<div className="flex flex-wrap gap-4">
					{Object.keys(visibleColumns).map((key) => (
						<button
							key={key}
							onClick={() => toggleColumn(key as keyof typeof visibleColumns)}
							className={`flex  cursor-pointer  items-center gap-2 px-3 py-1.5 text-sm rounded-lg border ${
								visibleColumns[key as keyof typeof visibleColumns]
									? "bg-blue-100 border-blue-500 text-blue-700"
									: "bg-gray-100 border-gray-400 text-gray-600"
							}`}
						>
							{visibleColumns[key as keyof typeof visibleColumns] ? <Eye /> : <EyeOff />}
							{key}
						</button>
					))}
				</div>
			</div>

			{/* Download */}
			<div className="bg-white p-4 border rounded-lg shadow">
				<h2 className="text-lg font-semibold text-gray-700 mb-4">📁 Data Export</h2>
				<button
					onClick={downloadJSON}
					className="bg-indigo-600    cursor-pointer   text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700"
				>
					<Download className="w-5 h-5" />
					Download All Teacher Data (JSON)
				</button>
			</div>

			{/* Teachers Table */}
			<div className="bg-white p-4 border rounded-lg shadow">
				<h2 className="text-lg font-semibold text-gray-700 mb-4">👨‍🏫 All Teachers</h2>
				<div className="overflow-x-auto">
					<table className="min-w-full text-sm border border-gray-200">
						<thead>
							<tr className="bg-gray-100">
								{visibleColumns.name && <th className="p-2 border">Name</th>}
								{visibleColumns.email && <th className="p-2 border">Email</th>}
								{visibleColumns.phone && <th className="p-2 border">Phone</th>}
								{visibleColumns.privateQualifications && <th className="p-2 border">Private Subjects</th>}
								{visibleColumns.groupQualifications && <th className="p-2 border">Group Subjects</th>}
							</tr>
						</thead>
						<tbody>
							{teacherList.map((t) => (
								<tr key={t.id} className="border-t">
									{visibleColumns.name && <td className="p-2 border">{t.name}</td>}
									{visibleColumns.email && <td className="p-2 border">{t.email}</td>}
									{visibleColumns.phone && <td className="p-2 border">{t.phone}</td>}
									{visibleColumns.privateQualifications && (
										<td className="p-2 border">
											{t.privateQualifications.map((q, i) => (
												<div key={i}>
													{q.name} (${q.rate})
												</div>
											))}
										</td>
									)}
									{visibleColumns.groupQualifications && (
										<td className="p-2 border">
											{t.groupQualifications.map((q, i) => (
												<div key={i}>
													{q.name} (${q.rate})
												</div>
											))}
										</td>
									)}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default Settings;
