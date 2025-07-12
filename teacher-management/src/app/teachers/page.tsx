// src/app/teachers/page.tsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { teacherList } from "@/app/utils/data";

export default function TeachersListPage() {
	const [search, setSearch] = useState("");
	const [sort, setSort] = useState("name");
	const [filter, setFilter] = useState("all");
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 9;

	const filteredTeachers = useMemo(() => {
		let result = teacherList.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()));

		if (filter === "private") {
			result = result.filter((t) => t.privateQualifications.length > 0);
		} else if (filter === "group") {
			result = result.filter((t) => t.groupQualifications.length > 0);
		}

		result.sort((a, b) => {
			if (sort === "name") return a.name.localeCompare(b.name);
			if (sort === "email") return a.email.localeCompare(b.email);
			return 0;
		});

		return result;
	}, [search, sort, filter]);

	const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);
	const paginatedTeachers = filteredTeachers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

	return (
		<div className="p-6 max-w-7xl mx-auto relative min-h-screen pb-24">
			<h2 className="text-2xl font-bold mb-6">All Teachers</h2>

			<div className="flex flex-col md:flex-row justify-between items-stretch md:items-end gap-4 mb-6 w-full">
				{/* Search Input */}
				<div className="w-full md:w-1/2">
					<input
						type="text"
						placeholder="Search teachers by name..."
						value={search}
						onChange={(e) => {
							setSearch(e.target.value);
							setCurrentPage(1);
						}}
						className="w-full p-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-400"
					/>
					{search && (
						<ul className="bg-white border rounded mt-1 shadow max-h-40 overflow-auto">
							{filteredTeachers.length > 0 ? (
								filteredTeachers.slice(0, 5).map((t) => (
									<li key={t.id} className="px-3 py-2 hover:bg-blue-100">
										<Link href={`/teachers/${t.id}`}>{t.name}</Link>
									</li>
								))
							) : (
								<span className="mx-auto flex items-center justify-center">No results found</span>
							)}
						</ul>
					)}
				</div>

				{/* Sort and Filter Controls */}
				<div className="flex flex-col sm:flex-row gap-4 w-full md:w-1/2">
					{/* Sort */}
					<div className="w-full sm:w-1/2">
						<label className="block text-sm font-medium mb-1">Sort by:</label>
						<select
							value={sort}
							onChange={(e) => setSort(e.target.value)}
							className="w-full p-2 border rounded shadow-sm"
						>
							<option value="name">Name</option>
							<option value="email">Email</option>
						</select>
					</div>

					{/* Filter */}
					<div className="w-full sm:w-1/2">
						<label className="block text-sm font-medium mb-1">Filter:</label>
						<select
							value={filter}
							onChange={(e) => setFilter(e.target.value)}
							className="w-full p-2 border rounded shadow-sm"
						>
							<option value="all">All</option>
							<option value="private">Private Qualified</option>
							<option value="group">Group Qualified</option>
						</select>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{paginatedTeachers.map((teacher) => (
					<Link
						key={teacher.id}
						href={`/teachers/${teacher.id}`}
						className="block p-4 bg-white border rounded-lg shadow hover:shadow-lg transition-transform hover:scale-[1.01]"
					>
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold">
								{teacher.name[0]}
							</div>
							<div>
								<h3 className="text-lg font-semibold text-blue-700">{teacher.name}</h3>
								<p className="text-sm text-gray-600">{teacher.email}</p>
								<p className="text-sm text-gray-500">{teacher.phone}</p>
							</div>
						</div>
						<div className="mt-3 text-xs text-gray-400">
							{teacher.privateQualifications.length > 0 && <span className="mr-2">🎓 Private</span>}
							{teacher.groupQualifications.length > 0 && <span>👥 Group</span>}
						</div>
					</Link>
				))}
			</div>

			<div className="fixed bottom-0 left-0 right-0 bg-white py-4 flex justify-center sm:justify-center items-center space-x-2 z-10">
				{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
					<button
						key={page}
						onClick={() => setCurrentPage(page)}
						className={`px-3 py-1 border rounded ${
							currentPage === page ? "bg-blue-600 text-white" : "bg-white text-blue-600 hover:bg-blue-100"
						}`}
					>
						{page}
					</button>
				))}
			</div>
		</div>
	);
}
