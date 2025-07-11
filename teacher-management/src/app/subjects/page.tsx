"use client";

import React, { useState } from "react";
import { teacherList } from "@/app/utils/data";

interface SubjectDetail {
	subject: string;
	teachers: {
		name: string;
		type: "Private" | "Group";
		rate: number;
	}[];
}

const Subjects = () => {
	const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

	const subjectMap = new Map<string, SubjectDetail>();

	teacherList.forEach((teacher) => {
		teacher.privateQualifications.forEach((q) => {
			const key = q.name;
			if (!subjectMap.has(key)) {
				subjectMap.set(key, {
					subject: key,
					teachers: [],
				});
			}
			subjectMap.get(key)!.teachers.push({ name: teacher.name, type: "Private", rate: q.rate });
		});
		teacher.groupQualifications.forEach((q) => {
			const key = q.name;
			if (!subjectMap.has(key)) {
				subjectMap.set(key, {
					subject: key,
					teachers: [],
				});
			}
			subjectMap.get(key)!.teachers.push({ name: teacher.name, type: "Group", rate: q.rate });
		});
	});

	const subjects = Array.from(subjectMap.values());

	return (
		<div className="max-w-5xl mx-auto p-4 space-y-6">
			<h1 className="text-3xl font-bold text-gray-800">🎯 Subjects & Teachers</h1>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
				{subjects.map((subject) => (
					<div
						key={subject.subject}
						onClick={() => setSelectedSubject(subject.subject)}
						className={`cursor-pointer bg-white border border-gray-100 rounded-lg p-4 shadow hover:shadow-md transition ${
							selectedSubject === subject.subject ? "ring-2 ring-indigo-500" : ""
						}`}
					>
						<p className="text-lg font-semibold text-indigo-600">{subject.subject}</p>
						<p className="text-sm text-gray-500">{subject.teachers.length} teacher(s)</p>
					</div>
				))}
			</div>

			{selectedSubject && (
				<div className="mt-6 bg-white border border-gray-200 rounded-lg p-4 shadow">
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-xl font-semibold text-gray-800">👩‍🏫 Teachers for {selectedSubject}</h2>
						<button onClick={() => setSelectedSubject(null)} className="text-sm text-red-600 hover:underline">
							Close
						</button>
					</div>
					<ul className="space-y-2">
						{subjectMap.get(selectedSubject)?.teachers.map((t, index) => (
							<li key={index} className="flex justify-between border-b border-dashed pb-2">
								<span className="font-medium text-gray-700">{t.name}</span>
								<span className="text-sm text-gray-500">
									{t.type} (${t.rate})
								</span>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default Subjects;
