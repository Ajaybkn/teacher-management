// src/app/teachers/[id]/page.tsx
"use client";

import { useParams, notFound } from "next/navigation";
import { teacherList } from "@/app/utils/data";
import dynamic from "next/dynamic";

// Dynamic imports
const TeacherCard = dynamic(() => import("@/app/components/TeacherCard"), { ssr: false });
const QualificationTable = dynamic(() => import("@/app/components/QualificationTable"), { ssr: false });
const ScheduleTabs = dynamic(() => import("@/app/components/ScheduleTabs"), { ssr: false });

export default function TeacherPage() {
	const params = useParams();
	const teacherId = Array.isArray(params?.id) ? params.id[0] : params?.id;

	const teacher = teacherList.find((t) => t.id === teacherId);

	if (!teacher) return notFound();

	return (
		<div className="p-6 space-y-6 max-w-6xl mx-auto">
			<TeacherCard teacher={teacher} />
			<QualificationTable title="Private Qualifications" qualifications={teacher.privateQualifications} />
			<QualificationTable title="Group Qualifications" qualifications={teacher.groupQualifications} />
			<ScheduleTabs />
		</div>
	);
}
