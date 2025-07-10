// components/QualificationTable.tsx

import { Qualification } from "../types";

type Props = {
	title: string;
	qualifications: Qualification[];
};

export default function QualificationTable({ title, qualifications }: Props) {
	return (
		<div className="bg-white shadow rounded-xl p-4 mt-4">
			<h2 className="text-lg font-semibold mb-2">{title}</h2>
			{qualifications.length === 0 ? (
				<p className="text-sm text-gray-500">No qualifications added.</p>
			) : (
				<table className="w-full text-sm">
					<thead>
						<tr className="text-left text-gray-600 border-b">
							<th className="py-2">Name</th>
							<th className="py-2">Rate ($/hr)</th>
						</tr>
					</thead>
					<tbody>
						{qualifications.map((q, i) => (
							<tr key={i} className="border-b last:border-0">
								<td className="py-2">{q.name}</td>
								<td className="py-2">${q.rate.toFixed(2)}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
}
