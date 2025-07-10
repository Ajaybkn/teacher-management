// components/TeacherCard.tsx

import { Teacher } from "../types";

type Props = {
	teacher: Teacher;
};

export default function TeacherCard({ teacher }: Props) {
	return (
		<div className="bg-white shadow rounded-xl p-6">
			<div className="text-xl font-bold">{teacher.name}</div>
			<p className="text-gray-500">{teacher.role}</p>
			<div className="mt-2 text-sm">
				<p>
					<strong>Birth Date:</strong> {teacher.birthDate}
				</p>
				<p>
					<strong>Email:</strong> {teacher.email}
				</p>
				<p>
					<strong>Phone:</strong> {teacher.phone}
				</p>
				<p>
					<strong>Address:</strong> {teacher.address}
				</p>
			</div>
		</div>
	);
}
